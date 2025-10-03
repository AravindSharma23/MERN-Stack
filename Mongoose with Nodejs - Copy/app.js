const express = require("express");
const app = express();
const dbo = require("./db");
const bookModel = require("./models/bookModel");
const bodyParser= require('body-parser');
const exhbs = require('express-handlebars');
//const ObjectId = dbo.ObjectId;
app.engine('hbs',exhbs.engine({
    layoutsDir:"views/",defaultLayout:"main",extname:"hbs",
    runtimeOptions :{ // only for handlebars
        allowProtoPropertiesByDefault : true,
        allowProtoMethodsByDefault : true
    }
}));
app.set('view engine','hbs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
const BookModel = require("./models/bookModel");

dbo.getDatabase(); // to connect with db 

app.get('/',async(req,res)=>{
  let books =  await BookModel.find({});

  let message = "";
    let edit_id,edit_book;
    
    if(req.query.edit_id){
        edit_id = req.query.edit_id;
       // edit_book = await collection.findOne({_id : new ObjectId(edit_id)});
        edit_book = await BookModel.findOne({_id:edit_id}) 
    }

     if(req.query.delete_id){

        //await collection.deleteOne({_id :new ObjectId(req.query.delete_id)});
      await  BookModel.deleteOne({_id:req.query.delete_id})

            return res.redirect('/?status=3');

    }

    switch(req.query.status){
        case '1' :
            message = "Successfully Inserted ";
            break;
         case '2' :
            message = "Successfully Updated ";
            break;
        case '3' :
            message = "Successfully deleted ";
            break;
        default :
           break;
    }
    res.render("main",{message,books,edit_id,edit_book});// rendering a main.hbs 
})

app.post('/store_book',async (req,res)=>{
   
    const book = new BookModel({title:req.body.title,author:req.body.author});
    book.save();
    return res.redirect('/?status=1');
})
app.post('/update_book/:edit_id', async(req,res)=>{
      let edit_id = req.params.edit_id;

      await BookModel.findOneAndUpdate({_id:edit_id},{title : req.body.title,author : req.body.author});
      return res.redirect('/? status=2');
})
app.listen(8000,()=>{
     console.log("Listening to 8000 port ");
     
})