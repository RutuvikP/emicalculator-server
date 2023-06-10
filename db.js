const mongoose=require('mongoose');

const connection=mongoose.connect("mongodb+srv://rutuvik:patil@cluster0.yalls5i.mongodb.net/emicalculator?retryWrites=true&w=majority")

module.exports={connection}