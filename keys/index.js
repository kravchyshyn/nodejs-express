const dbName = 'shop';
const password = 'qw8QFXooUTC0T1sl';
const MONGODB_URI = `mongodb+srv://vitalii:${password}@cluster0.y5ybx.mongodb.net/${dbName}`

module.exports = {
    MONGODB_URI: MONGODB_URI,
    SESSION_SECRET: 'Some secret key'
}