import passport from "passport";
import {Strategy} from "passport-google-oauth2";
import {User} from "../models/schemas/user.mjs";


export default passport.use(
    new Strategy(
        {
            clientID: '',
            clientSecret: '',
            callbackURL: "http://localhost:5173",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done)=>{
            let finduser
            try{
                finduser = await User.findOne({email:profile.email})
            }catch (err){
                return done(err, null)
            }
            try{
                if(!finduser){
                    const newUser = new User({
                        username:profile.username,
                        email:profile.email,
                    })
                    const newSavedUser = await newUser.save()
                    return done(null, newSavedUser)
                }
            }catch(err){
                return done(err, null)
            }
            return done(null, finduser)
        }
    )
)
