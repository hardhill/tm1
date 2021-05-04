const passport = require('passport')
const {Router} = require('express')
const upload = require('../middlewares/upload')
const ctr = require('../controllers/post.controller')

const router = Router()
//Administration route
// /api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt',{session:false}),
  upload.single('image'),
  ctr.createPost
)
router.get('/admin/',passport.authenticate('jwt',{session:false}), ctr.getAll)
router.get('/admin/:id',passport.authenticate('jwt',{session:false}), ctr.getById)
router.put('/admin/:id',passport.authenticate('jwt',{session:false}), ctr.updatePost)
router.delete('/admin/:id',passport.authenticate('jwt',{session:false}), ctr.remove)

//Base part
// /api/post
router.get('/',ctr.getAll)
router.get('/:id',ctr.getById)
router.put('/:id',ctr.addView)


module.exports = router
