const {Router, response} = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport')
const keys = require('../keys')
const resetEmail = require('../emails/reset');
const registerEmail = require('../emails/register');
const crypto = require('crypto');
const {validationResult} = require('express-validator')
const {registerValidators} = require('../utils/validators');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: { api_key: keys.SENDGRID_API_KEY }
}))

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

router.post('/register', registerValidators, async (req, res) => {
    try {
        const {name, email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg)

            return res.status(422).redirect('/auth/login#register');
             // 422 - status який говорить що в нас є помилки валідації
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User(
            { name, email, password: hashPassword, cart: { items: []} 
        });

        await user.save();
        await transporter.sendMail(registerEmail(email));
        res.redirect('/auth/login#login');

    } catch (error) {
        console.log(error);
    }
});

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Reset password',
        error: req.flash('error')
    });
});

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async(error, bytes) => {
            if (error) {    
                req.flash('error', 'Something went wrong, please try again later');
                return res.redirect('/auth/reset');
            }

            const token = bytes.toString('hex');
            const candidate =  await User.findOne({
                email: req.body.email
            });

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 24 * 60 * 60 * 1000;
                await candidate.save();
                await transporter.sendMail(resetEmail(candidate.email, token));

                res.redirect('/auth/login');
            } else {
                req.flash('error', 'User with this email is not exist');
                res.redirect('/auth/reset');
            }
        
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login');
    }


    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() }
        });


        console.log('603410cfca8d536c33010706', user);

        if (!user) {
            res.redirect('/auth/login');
        } else {
            res.render('auth/restore-password', {
                title: 'Restore password',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/password', async (req, res) => {
    try {
        console.log('603410cfca8d536c33010706', req.body);
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() }
        });

        // console.log('603410cfca8d536c33010706', user);

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10) ;
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();

            res.redirect('/auth/login');
        } else {
            req.flash('loginError', 'Expired token, please try again from skretch');
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;