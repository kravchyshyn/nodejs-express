const { Router } = require('express');
const router = Router();

router.get('/courses', (request, response) => {
    response.render('courses', {
        title: 'Courses',
        isCourses: true
    });
})


module.exports = router;