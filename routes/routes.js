const router = require('express').Router();
const UserModel = require ('../models/shemas');
router.get('/', (req,res)=>{
    res.send('Hello')
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