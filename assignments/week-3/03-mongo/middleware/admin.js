const { Admin } = require('../db/index.js')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    const foundAdmin = Admin.findOne({
        username,
        password
    })

    if(foundAdmin){
        next()
    }else{
        res.json({
            msg: "Admin does not exist"
        })
        return
    }
}

module.exports = adminMiddleware;