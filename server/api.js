const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}

router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id
  db.Article.findOne({_id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

router.get('/api/getArticles', (req, res) => {
  db.Article.find(null, 'title date content', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      const data = doc.sort(keysrt('date',true));
      res.send(JSON.stringify(data))
    }
  })
})

router.get('/api/getComments', (req, res) => {
  const articleID = req.query.id
  db.Comment.find({articleID}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})

router.post('/api/readNum',(req,res)=> {
  var _id = req.body.id
  
  var num = 0
   db.Article.findOne({_id}, (err, doc) => {
    //res.send(doc);
    if(err){
      console.log(err)
    }else{
      if(doc.readNum){
        num =doc.readNum + 1;             
      }else{
          num += 1
      }
      var article= {
           readNum : num 
        }  
      db.Article.findByIdAndUpdate(_id,article, fn)   
    }
  }) 
  res.status(200).end()
})

router.post('/api/saveComment', (req, res) => {
  var mydate = new Date();
  var localtime = mydate.toLocaleString( )
  const comment = {
    nickName:req.body.nickName,
    email: req.body.email,
    content: req.body.content,
    createdate: localtime,
    articleID: req.body.articleID
  }  
  new db.Comment(comment).save()  
  res.status(200).end()
})

router.post('/api/login', (req, res) => {
  const {name, pwd} = req.body
  db.User.findOne({name}, 'pwd', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({state: 0, msg: '账号不存在'})
        break
      case doc.pwd === pwd:
        res.send({state: 1, msg: '登陆成功'})
        break
      case doc.pwd !== pwd:
        res.send({state: 2, msg: '密码错误'})
        break
      default :
        res.send({state: 3, msg: '未知错误'})
    }
  })
})

router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    readNum: 0
  }
  if (id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    new db.Article(article).save()
  }
  res.status(200).end()
})

router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})

router.post('/api/getLinks', (req, res) => {
  db.Link.find(null, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

router.post('/api/saveLinks', (req, res) => {
  const links = req.body || []
  db.Link.remove(null, fn)
  const promises = links.map(({name, href}) => new db.Link({name, href}).save())
  Promise.all(promises)
    .then(() => res.status(200).end())
    .catch(() => res.status(500).end())
})

router.post('/api/savePwd', (req, res) => {
  const {name, pwd} = req.body
  db.User.findOneAndUpdate({name}, {pwd}, fn)
  res.status(200).end()
})
router.get('/api/getUsers',(req,res)=>{
   db.User.find(null, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      //const data = doc.sort(keysrt('date',true));
      res.send(JSON.stringify(doc))
    }
  })
})
router.get('/api/getUser',(req,res)=>{
  const _id = req.query.id
  db.User.findOne({_id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})
router.post('/api/saveUser',(req,res)=>{
  const id = req.body._id
  const user = {
    name: req.body.name,
    pwd: req.body.pwd
  }
  if (id) {
    db.User.findByIdAndUpdate(id, user, fn)
  } else {
    new db.User(user).save()
  }
  res.status(200).end()
})
router.post('/api/deleteUser',(req,res) => {
  db.User.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})
//排序
function keysrt(key,desc) {
  return function(a,b){
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}
module.exports = router
