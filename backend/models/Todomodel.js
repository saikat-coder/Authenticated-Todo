const mongoose=require('mongoose');

const TodoSchema=new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
      }
})

const TodoModel=mongoose.model('todos',TodoSchema)
module.exports=TodoModel;