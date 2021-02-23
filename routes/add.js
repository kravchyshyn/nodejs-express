const  { Router } = require('express');
const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');
const {validationResult} = require('express-validator')
const {courseValidators} = require('../utils/validators');

router.get('/', auth, (request, response) => {
    response.render('add', {
        title: 'Add new course',
        isAdd: true
    });
})

router.post('/', auth, courseValidators, async (req, res) => {
    // console.log('data which we send by POST method', req.body);
    // const course = new Course(req.body.title, req.body.price, req.body.image)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'Add new course',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                image: req.body.image
            }
        });
    }

    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        userId: req.user
    });

    try {
        await course.save();

        res.redirect('/courses');
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;