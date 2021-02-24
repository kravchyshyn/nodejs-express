const dbName = 'shop';
const password = 'qw8QFXooUTC0T1sl';
const MONGODB_URI = `mongodb+srv://vitalii:${password}@cluster0.y5ybx.mongodb.net/${dbName}`

module.exports = {
    MONGODB_URI: MONGODB_URI,
    SESSION_SECRET: 'Some secret key',
    SENDGRID_API_KEY: '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',
    EMAIL_FROM: 'vitalik1991ua@gmail.com',
    BASE_URL: 'http://localhost:5000'
}
