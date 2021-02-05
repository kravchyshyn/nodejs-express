const { Router } = require('express');
const router = Router();
const Course = require('../models/course');
const { route } = require('./home');

router.get('/', async (request, response) => {

    const courses = await Course.getAll();

    response.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
})

router.get('/:id', async (request, response) => {
    const course = await Course.getById(request.params.id);
    response.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
})


module.exports = router;