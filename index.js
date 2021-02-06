const { response } = require('express');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const app = express();

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Додаванання динамічних html сторінок
// Pug, EJS, Handlebars = шаблонізатори
// npm install express-handlebars

// https://handlebarsjs.com/


