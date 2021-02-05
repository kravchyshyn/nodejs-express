const  { Router } = require('express');
const router = Router();

router.get('/', (request, response) => {
    response.render('add', {
        title: 'Add new course',
        isAdd: true
    });
})

router.post('/', (req, res) => {
    console.log('data which we send by POST method', req.body);

    res.redirect('/courses');
})

module.exports = router;