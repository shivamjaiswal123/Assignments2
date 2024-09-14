const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index')

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    if(!(username && password )){
        res.json({
            msg: 'All the inputs requiered'
        })
    }

    await User.create({
        username,
        password
    })

    res.status(200).json({
        msg: 'User created successfully',
    })

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})

    res.status(200).json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId

    const foundCourse = await Course.findOne({
        _id: id
    })
    if(!foundCourse){
        res.json({
            msg:'Course does not exist'
        })
    }

    await User.updateOne({ username: req.body.username },{
            $push: {
              purchasedCourse: id
            }
    })

    res.json({
        msg: 'Course purchased successfully'
    })

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.user
    const user = await User.findOne({ username })

    if(!user){
        res.json({
            msg: 'User not found'
        })
    }

    const courses = await Course.find({
        _id: {
            $in: user.purchasedCourse
        }
    })

    res.json({
        courses
    })
});

module.exports = router