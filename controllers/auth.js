// controllers/auth.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    // Sign Up Form
    app.get('/sign-up', (req, res) => res.render('sign-up'));

    // Sign Up Post
    app.post('/sign-up', async (req, res) => {
        console.log('hello')
        // Create User and JWT
        const user = new User(req.body);

        user
            .save()
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                return res.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    // Log In
    app.get('/login', (req, res) => res.render('login'));
    
    // LOGIN - POST route
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // Find this user name
        User.findOne({ username }, 'username password')
        .then((user) => {
            if (!user) {
            // User not found
            return res.status(401).send({ message: 'Wrong Username or Password' });
            }
            // Check the password
            user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                // Password does not match
                return res.status(401).send({ message: 'Wrong Username or password' });
            }
            // Create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                expiresIn: '60 days',
            });
            // Set a cookie and redirect to root
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            return res.redirect('/');
            });
        })
        .catch((err) => {
            console.log(err);
        });
    });

    // Log Out
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.redirect('/');
    })
};