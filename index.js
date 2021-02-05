const { response } = require('express');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const app = express();


// Configuring of handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs' // default value is handlebars
})

// Confirm using of handlebars
app.engine('hbs', hbs.engine);

// Set view engine to express
app.set('view engine', 'hbs');
// Set folder for views templates
app.set('views', 'views');

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index', {
        title: 'Main page',
        isHome: true
    });
})

app.get('/courses', (request, response) => {
    response.render('courses', {
        title: 'Courses',
        isCourses: true
    });
})

app.get('/add', (request, response) => {
    response.render('add', {
        title: 'Add new course',
        isAdd: true
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Додаванання динамічних html сторінок
// Pug, EJS, Handlebars = шаблонізатори
// npm install express-handlebars

// https://handlebarsjs.com/


