const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User } = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return done(null, false)
            }
            const valid = user.password && (await bcrypt.compare(password, user.password))
            if (!valid) {
                return done(null, false)
            }
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    },
))
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = User.findOrCreate({ googleId: profile.id })
        if (existingUser) {
            console.log('user exists')
            const accessToken = jwt.sign(existingUser.toJSON(), process.env.SECRET_KEY, {
                expiresIn: '24h'
            })
            return done(null, accessToken)
        } else {
            const newUser = new User({
                method: 'google',
                email: profile.emails[0].value,
                google: {
                    id: profile.id
                }
            })

            await newUser.save()
            const accessToken = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY, {
                expiresIn: '24h'
            })
            return done(null, accessToken)
        }
    } catch (error) {


    }
}
))