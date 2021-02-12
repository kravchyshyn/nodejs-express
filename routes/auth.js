const {Router, response} = require('express');
const User = require('../models/user')
const router = Router()

router.get('/login', (req, res) => {

    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    })
});

router.post('/login', async (req, res) => {
    const user = await User.findById('60205bebea8e15e1ad71e33a');

    req.session.user = user;
    req.session.isAuthenticated = true;

    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;