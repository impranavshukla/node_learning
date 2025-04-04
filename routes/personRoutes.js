const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

//POST route to save the person data
router.post('/',async (req,res)=>{
    try{
     const data=req.body; //assuming the request body contains the person data
   
     //create a new person document using the mongoose model
     const newPerson=new Person(data);
   
     //save the person document to the database
    const response=await newPerson.save();
    console.log('data saved successfully');
    res.status(200).json(response);
    }
    catch(err){
       console.log('Error in saving data:',err);
       res.status(500).json({error:'Internal server error'})
    }
   })
   

   router.get('/:worktype',async (req,res)=>{
     try{
       //extract the worktype from the URL parameters
        const worktype=req.params.worktype;
        if(worktype=='chef'||worktype=='waiter'||worktype=='manager'){
           //find all the persons with the given worktype
           const response=await Person.find({work:worktype});
           console.log('Data fetched successfully');
           res.status(200).json(response);
        }
        else{
           res.status(404).json({error:'Invalid work type'})
        }
     }
     catch(err){
       console.log('Error in fetching data:',err);
       res.status(500).json({error:'Internal server error'})
     }
   })


   //get method to get the person 
router.get('/', async (req,res)=>{
    try{
       const data=await Person.find();
       console.log('Data fetched successfully');
       res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
    })


    router.put('/:id',async (req,res)=>{
         try{
            //extract the id from the URL parameters
            const personid=req.params.id;
            const updatedPersonData=req.body;
            //update the person document with the given id
            const response=await Person.findByIdAndUpdate(personid,updatedPersonData,{new:true,runValidators:true});

            if(!response){
               return res.status(404).json({error:'Person not found'});
            }

            console.log('Data updated successfully');
            res.status(200).json(response);
         }
         catch(err){
            console.log('Error in updating data:',err);
            res.status(500).json({error:'Internal server error'})
         }
    })
    

    router.delete('/:id', async (req,res)=>{
      try{
          //extract the persons id from the url parameter
           const personId=req.params.id;

           //asuming you have a Person model
           const response=await Person.findByIdAndDelete(personId);
           if(!response){
            return res.status(404).json({error: 'Person not found'});
           }
           console.log('data delete');
           res.status(200).json({message:'person deleted successfully'});
      }
      catch(err){
         console.log('Error in deleting data:',err);
         res.status(500).json({error:'Internal server error'})
      }
    })



    module.exports=router;