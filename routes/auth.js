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

router.post('/register', async (req, res) => {
    try {
        const {name, email, password, confirm } = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            res.redirect('/auth/login#register');
        } else {
            const user = new User(
                { name, email, password, cart: { items: []} 
            });

            await user.save();
            res.redirect('/auth/login#login');
    
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;