import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Booking } from "../models/schemas/Bookings.mjs";

const razorpay = new Razorpay({
    key_id: 'rzp_test_zOyOXyclGeGfOW', // Your Razorpay Key ID
    key_secret: 'K8744VrnXDQCCAHlWrlxNUoE', // Your Razorpay Key Secret
});

const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Prepare the signature string
    const shasum = crypto.createHmac('sha256', razorpay.key_secret);
    shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = shasum.digest('hex');
    console.log('Generated Signature:', generated_signature);
    console.log('Received Signature:', razorpay_signature);

    if (generated_signature === razorpay_signature) {
        try {
            // Find the booking record using the Razorpay order ID
            const booking = await Booking.findOne({ orderId: razorpay_order_id });

            if (!booking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            // Mark the payment as successful
            booking.paymentId = razorpay_payment_id;
            booking.paymentStatus = 'successful';
            await booking.save();

            // Optionally, send a confirmation email or any other action
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } catch (err) {
            console.error('Error verifying payment:', err);
            res.status(500).json({ success: false, message: 'Error verifying payment' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
};

export default verifyPayment;
