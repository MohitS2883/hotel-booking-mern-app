import passport from "passport";
import { Strategy } from "passport-discord";
import { User } from "../models/schemas/user.mjs";
import jwt from "jsonwebtoken";

export default passport.use(
    new Strategy({
            clientID: "1305065621251293224",
            clientSecret: "dxbfax9XDX1VYuFr6dLtYA9NQKmEK5mK",
            callbackURL: "http://localhost:4000/auth/discord/callback",
            scope: ["identify", "guilds", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            let user;
            try {
                user = await User.findOne({ discordId: profile.id });
                console.log(profile)
            } catch (err) {
                return done(err, null);
            }
            try {
                if (!user) {
                    const newUser = new User({
                        discordId: profile.id,
                        username: profile.username,
                        email: profile.email,
                    });
                    user = await newUser.save();
                }
                console.log(profile)
                const token = jwt.sign(
                    { id: user._id, discordId: user.discordId, username: user.username, email: user.email },
                    'secret'
                );
                return done(null, token);
            } catch (err) {
                console.log(err);
                return done(err, null);
            }
        }
    )
);
