const {User} = require('../db/index')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    try {
        const foundUser = User.findOne({
            username, 
            password
        })

        if(foundUser){
            req.user = username
            next()
        }else{
            res.json({
                msg: "User does not exist"
            })
        }
    } catch (error) {
        
    }
}

module.exports = userMiddleware;