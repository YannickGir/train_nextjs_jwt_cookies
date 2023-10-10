const router = require('express').Router();
const UserModel = require ('../models/shemas');

router.post('/register', (req,res)=>{
    const user = new UserModel(
        {name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password}
        )
})

router.get('/getUsers', async (req, res) => {
    try {
        const data = await UserModel.find();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;