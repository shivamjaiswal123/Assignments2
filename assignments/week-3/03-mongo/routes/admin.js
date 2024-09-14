const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index.js')

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    if(!(username && password )){
        res.json({
            msg: 'All the inputs requiered'
        })
    }

    const admin = await Admin.create({
        username,
        password
    })

    res.status(200).json({
        msg: 'Admin created successfully',
        admin
    })

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})

    res.status(200).json({
        courses
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic

    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink
    })

    res.status(200).json({
        msg: 'Course created succussfully',
        newCourse
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;