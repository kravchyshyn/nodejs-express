const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (request, response) => {

    const courses = await Course.getAll();

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

    const course = await Course.getById(req.params.id);

    res.render('course-edit', {
        title: `Edit course ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body);

    res.redirect('/courses')
});

router.get('/:id', async (request, response) => {
    const course = await Course.getById(request.params.id);
    response.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
})


module.exports = router;