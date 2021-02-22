const keys = require('../keys')

module.exports = function(email, token) {
    return {
        from: keys.EMAIL_FROM,
        to: email,
        subject: 'Restore password',
        html: `
        <h1>Forgot your password </h1>
        <p> If you dont need to restore password please ignore this letter</p>
        <br>
        <p>To restore access click on link below</p>
        <p><a href='${keys.BASE_URL}/auth/password/${token}'>Restore access</a></p>
        <hr>
        Now you have full access to our <a href="${keys.BASE_URL}"> Courses shop </a>"
    `
    }
};