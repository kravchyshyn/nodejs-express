const { Router } = require('express');
const router = Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');

function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString();
}

router.get('/', async (request, response) => {
    try {
        const courses = await Course.find().populate('userId', 'email name').select('title price image');
        response.render('courses', {
            title: 'Courses',
            isCourses: true,
            userId: request.user ? request.user._id : null,
            courses
        });
    } catch (error) {
        console.log(error);
    }
})


router.get('/:id/edit', auth, async (req, res) => {
    try {
        if (!req.query.allow) {
            return res.redirect('/');
        }
    
        const course = await Course.findById(req.params.id);
    
        if (!isOwner(course, req)) {
            return res.redirect('/courses');
        }
    
        res.render('course-edit', {
            title: `Edit course ${course.title}`,
            course
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        });
     
        res.redirect('/courses');
    } catch( e ) {
        console.log('e', e);
    }
});

router.post('/edit', auth, async (req, res) => {
    try {
        const {id} = req.body;
        const course = await Course.findById(id);

        if (!isOwner(course, req)) {
            return res.redirect('/courses');
        }

        Object.assign(course, req.body);
        await course.save();

        res.redirect('/courses') 
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (request, response) => {
    try {
        const course = await Course.findById(request.params.id);
        response.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        });
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;