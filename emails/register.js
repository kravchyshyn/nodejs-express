const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account has been created',
        html: `
            <h1>Thanks for registration on our shop</h1>

            <p>You register a new account with email - ${email}</p>

            <hr>

            Now you have full access to our <a href="${keys.BASE_URL}"> Courses shop </a>"
        `
    }
}