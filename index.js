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
    response.render('index');


    // set response code status, in express code 200 is default value
    // response.status(200);

    //to render static html file
    // response.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (request, response) => {
    response.render('about');
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Додаванання динамічних html сторінок
// Pug, EJS, Handlebars = шаблонізатори
// npm install express-handlebars



