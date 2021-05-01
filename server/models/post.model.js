const {model, Schema} = require('mongoose')
const postSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default: Date.now
  },
  views:{
    type:Number,
    default:0
  },
  imageUrl:{
    type:String
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref:'comments'
  }]
})
model.exports = model('posts',postSchema)