import 'dotenv/config';
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

// app.get("/",(req,res)=>{
//     res.send("hello from hitesh")
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("hello from hitesh wanna have ice -tea")
// })
// app.get("/ice-teas",(req,res)=>{
//     res.send("hello from hitesh wanna have ice -teas")
// })

app.use(express.json())
let teaDatA = []
let nextid = 1
app.post("/teas",(req,res)=>{
    const {name,price} = req.body
    const newTea = {id:nextid++,name,price}
    teaDatA.push(newTea)
    res.status(201).send(newTea)
})
app.get("/teas",(req,res)=>{
    res.status(200).send(teaDatA)
})
app.get("/teas/:id",(req,res)=>{
    const {id} = req.params
    const tea = teaDatA.find((tea)=>tea.id === Number(id))
    if(tea){
        res.status(200).send(tea)
    }
    else{
        res.status(404).send("Tea not found")
    }
})
app.delete("/teas/:id",(req,res)=>{
    const {id} = req.params
    const index = teaDatA.findIndex((tea)=>tea.id === Number(id))
    if(index !== -1){
        teaDatA.splice(index,1)
        res.status(204).send("Deleted")
    }
    else{
        res.status(404).send("Tea not found")
    }
})
app.put("/teas/:id",(req,res)=>{
    const {id} = req.params
    const {name,price} = req.body
    const tea = teaDatA.find((tea)=>tea.id === Number(id))
    if(tea){
        if(name){
            tea.name = name
        }
        if(price){
            tea.price = price
        }
        res.status(200).send(tea)
    }
    else{
        res.status(404).send("Tea not found")
    }
})
app.listen(port, () => {
    console.log(`Server running at port:${port}/`)
})