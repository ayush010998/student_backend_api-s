const express=require('express');
require('./db/conn');
const Student=require("./models/students");
const app=express();
const port=process.env.PORT||3000;

app.use(express.json());




app.post("/students",(req,res)=>{
    console.log(req.body);
    const user=new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})



app.get('/students',async(req,res)=>{
    try{
        const studentsData=await Student.find();
        res.send(studentsData);

    }catch(e){
        res.send(e);


    }


})

app.get('/students/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const studentData=await Student.findById(_id);
        res.send(studentData);

    }
    catch(e){
        res.send(e);

    }
})

app.patch("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudents=await Student.findByIdAndUpdate(_id,req.body);
        res.status(200).send(updateStudents);

    }
    catch(e){
        res.status(404).send(e);

    }
})


app.delete('/students/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const deleteStudent=await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.send(400).send();
        }
        res.status(200).send(deleteStudent)



    }
    catch(e){
        res.status(400).send(e);

    }

})



app.listen(port,()=>{
    console.log(`connection is setup at port ${port}`);
})

