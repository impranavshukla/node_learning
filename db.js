const mongoose=require('mongoose');

//define the MongoDB connection URL

const mongoURL='mongodb://localhost:27017/hotel';

//set up MongoDB connection
mongoose.connect(mongoURL);

//Get the default connection
//mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//define event listner for the connection
//event listner is used to monitor the connection event
db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
})
db.on('error',(err)=>{
    console.log('Error in connecting to MongoDB Server:',err);
})
db.on('disconnected',()=>{
    console.log('MongoDB Server disconnected');
})

//export the database connection 
module.exports=db;