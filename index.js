const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); //json타입을 분석할수 있게 함.

const mongoose = require('mongoose')
mongoose.connect(config.mongoURL, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then( () => console.log('MongoDB Connected...'))
  .then(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World~~~~~~~~~~~~~~~~~~~~~~~!'))

app.post('/register', (req, res) => {
    //회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
    /* req.body에는 아래 정보같은것이 들어 있다. 이게 가능한게 bodyparser가 있기 떄문에 가능하다.
    {
        id: "hello",
        password: "123"
    }
    */
    const user = new User(req.body)
    user.save((err, userInfo) =>{
        if(err) return res.json({ sccess: false, err})
        return res.status(200).json({
            success: true
        })
    }) //이save는 몽고디비의 함수이다.
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))