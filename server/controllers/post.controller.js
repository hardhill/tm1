const Posts = require('../models/post.model')

module.exports.createPost = async (req,res)=>{
  const post = new Posts({
    title:req.body.title,
    text:req.body.text,
    imageUrl: `/${req.file.filename}`
  })
  try{
    await post.save()
    res.status(201).json(post)
  }catch(e){
    res.status(500).json({e})
  }
}

module.exports.getAll = async (req,res)=>{
  try {
    const posts = await Posts.find().sort({date: -1})
    res.json(posts)
  }catch(e){
    res.status(500).json({e})
  }
}

module.exports.getById = async (req,res)=>{
  try{
    await Posts.findById(req.params.id).populate('comments').exec((error,post)=>{
      res.json(post)
    })
  }catch(e){
    res.status(500).json({e})
  }
}

module.exports.updatePost = async (req,res)=>{
  const $set={
    text:req.body.text
  }
  try{
    const post = await Posts.findOneAndUpdate({
      _id:req.params.id
    }, {$set},{new:true})
    res.json(post)
  }catch(e){
    res.status(500).json({e})
  }
}

module.exports.remove = async (req,res)=>{
  try{
    await Posts.deleteOne({_id:req.params.id})
    res.json({message:'Post deleted'})
  }catch(e){
    res.status(500).json({e})
  }
}

module.exports.addView = async (req,res)=>{
  $set = {
    views: ++req.body.views
  }
  try{
    await Posts.findOneAndUpdate({_id:req.params.id},{$set})
    res.status(204).json()
  }catch(e){
    res.status(500).json({e})
  }
}
