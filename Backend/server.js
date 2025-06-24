import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './model/user.js';
import cors from 'cors';
import { form } from './model/form.js';

const app=express();

connectDB();

//MiddleWare for json formate
app.use(express.json());
//MiddleWare for key value pare
app.use(express.urlencoded());
//MiddleWare For the Port number
app.use(cors());

//custom
const methodFind=(req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
};
app.use(methodFind);

const blockDelete=(req,res,next)=>{
    if(req.method==="DELETE"){
        return res.send('Delete function blocked')
    }
    next()
}
app.use(blockDelete)

app.get('/get', async(req,res) => {
    const user = await User.find();
    res.json(user);
});

app.get('/get/:id',async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) res.json({'msg':'no user found with that id'});
        res.json(user);
    } catch(error) {
        res.send(error);
    }
});

app.post('/post', async(req,res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.json(newUser)
        res.status(201).json(newUser)
    } catch(error) {
        res.status(401).json(error)
    }
});

app.put('/put/:id', async(req,res)=> {
    try {
        const update = await User.findByIdAndUpdate(req.params.id,req.body)
        res.json({'msg':'data updated'})
    } catch(error) {
        res.json(error)
    }
});

app.patch('/patch',(req,res) => {
    res.send('from patch');
});

app.delete('/delete/:id', async(req,res) => {
    try {
        const Delete = await User.findByIdAndDelete(req.params.id,req.body)
        res.json({'msg':'data deleted'})
    } catch(error) {
        res.json(error)
    }
});

app.get('/getform', async(req,res) => {
    const formData = await form.find()
    res.json(formData)
})

app.post('/postform', async(req,res) => {
    try {
        const newform = new form(req.body)
        await newform.save()
        res.status(201).json({msg:'User created'})
    } catch(error) {
        res.json(error)
    }
})
app.listen(3000, ()=> {
    console.log('Server running on port http://localhost:3000');
});