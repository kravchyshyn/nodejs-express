const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (request, response) => {

    const courses = await Course.find();

    response.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
})


router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render('course-edit', {
        title: `Edit course ${course.title}`,
        course
    })
})

router.post('/remove', async (req, res) => {

    try {
        await Course.deleteOne({
            _id: req.body.id
        });
     
        res.redirect('/courses');
    } catch( e ) {
        console.log('e', e);
    }

   //    await Course.findByIdAndDelete( req.body.id);
});

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);

    res.redirect('/courses')
});

router.get('/:id', async (request, response) => {
    const course = await Course.findById(request.params.id);
    response.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
})


module.exports = router;