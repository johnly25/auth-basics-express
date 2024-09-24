const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const pool = require('../db/pool')
const bcrypt = require("bcryptjs")



router.get('/', controller.loginGET)

router.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
)

router.get("/log-out", controller.logoutPOST)

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password)

            if (!user) {
                console.log('incorrect username')
                return done(null, false, { message: "Incorrect username" })
            }
            if (!match) {
                console.log('incorrect passowrd')
                return done(null, false, { message: "Incorrect password" })
            }
            return done(null, user)
            
        } catch (err) {
            return done(err)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
})

module.exports = router;
