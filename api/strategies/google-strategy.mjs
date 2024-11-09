import passport from "passport";
import {Strategy} from "passport-google-oauth2";
import {User} from "../models/schemas/user.mjs";


export default passport.use(
    new Strategy(
        {
            clientID: '1035966692157-34s26raffl4816ftbg5aoa8vo16l48mo.apps.googleusercontent.com',
            clientSecret: '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',
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