const {Router, response} = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const router = Router()

router.get('/login', (req, res) => {

    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    })
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Invalid password. Please try again');
                res.redirect('/auth/login/#login')
            }
        } else {
            req.flash('loginError', 'Incorrect user email');
            res.redirect('/auth/login/#login')
        }

    } catch (error) {
        console.log(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const {name, email, password, confirm } = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            req.flash('registerError', 'User with such email is already exist');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User(
                { name, email, password: hashPassword, cart: { items: []} 
            });

            await user.save();
            res.redirect('/auth/login#login');
    
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;