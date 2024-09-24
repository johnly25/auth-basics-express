const pool = require("../db/pool")
const bcrypt = require("bcryptjs")

exports.loginGET = (req, res) => res.render("log-in-form", { user: req.user })
exports.signUpGET = (req, res) => res.render("sign-up-form")

exports.signUpPOST = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
            await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
                req.body.username,
                hashedPassword,
            ])
            res.redirect("/")
        } catch (err) {
            return next(err)
        }
    })
}

exports.logoutPOST = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    });
}