const { Router } = require('express');
const router = Router();
const Course = require('../models/course')

router.get('/', async (request, response) => {

    const courses = await Course.getAll();

    response.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
})


module.exports = router;