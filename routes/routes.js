const router = require('express').Router();
const UserModel = require ('../models/shemas');
const bcrypt = require('bcrypt')

router.post('/register', async(req,res)=>{
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new UserModel(
        {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword,
        }
    )
    const result = await user.save()
    const {password, ...data} = result.toJSON() //ici on sépare le password du reste des infos de l'user
    res.send(data) //ici on renvoi toutes les infos à l'exception de password
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

router.post('/login', async(req, res) =>{
    try {
        const data = await UserModel.findOne({email:req.body.email})
    if(!data) {
        return res.status(404).send(
            {message : "user not found..."}
        )
    }
    
    if (await bcrypt.compare(req.body.password, data.password)) {
        return res.status(200).send({ message: "Login successful" });
    } else {
        return res.status(400).send({ message: "Invalid credentials..." });
    }
}
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = router;