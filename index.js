const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const app = express();
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

const User = require('./models/user');

// Configuring of handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs', // default value is handlebars
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

// Confirm using of handlebars
app.engine('hbs', hbs.engine)

// Set view engine to express
app.set('view engine', 'hbs');
// Set folder for views templates
app.set('views', 'views');

app.use(async (req, res, next)=> {
    try {
        const user = await User.findById('60205bebea8e15e1ad71e33a');
        req.user = user;

        next();
        
    } catch (error) {
        console.log('error', error);
    }

})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);


const PORT = process.env.PORT || 5000;

async function start() {
    try {
        const dbName = 'shop';
        const password = 'qw8QFXooUTC0T1sl';
        const mongodbUrl = `mongodb+srv://vitalii:${password}@cluster0.y5ybx.mongodb.net/${dbName}`

        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                email: 'vitalik1991ua@gmail.com',
                name: 'Vitalii',
                cart: {items: []}
            });

            await user.save();
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
    
}

start()

// Додаванання динамічних html сторінок
// Pug, EJS, Handlebars = шаблонізатори
// npm install express-handlebars

// https://handlebarsjs.com/


