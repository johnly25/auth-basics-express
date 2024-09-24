/////// app.js
const express = require("express");
const session = require("express-session");
const indexRouter = require('./router/router')
const authRouter = require('./router/auth-router')
const path = require('path')
const passport = require("passport");

const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
















































































