const mongoose = require("mongoose");

async function getDatabase(){
    
    mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(()=>{
        console.log("Database connected")
    }).catch((e)=>{
        console.log("Error in Database connection");
        
    });
    
}

module.exports = {
    getDatabase

}