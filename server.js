const express = require('express')
const app = express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000;

const Person=require('./models/Person');
const MenuItem=require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Welcome to my hotel how can i help you ...')
})






app.post('/menuitem',async(req,res)=>{
  try{
    const data=req.body;
    const newMenu=new MenuItem(data);
    const response=await newMenu.save();
    console.log('Data saved successfully');
    res.status(200).json(response);
  }
  catch(err){
    console.log('Error in saving data:',err);
    res.status(500).json({error:'Internal server error'})
  }
 })


//import the router files
const personRoutes=require('./routes/personRoutes');
//use the router files
app.use('/person',personRoutes);




app.listen(PORT,()=>{
    console.log('Server is running on port 3000')
})