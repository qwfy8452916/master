//0.安装
//1.引包
var express = require('express')

//2.创建你服务器应用程序
// 也就是原来的http.createServer
var app=express()
//安装
// npm install --save art-template
// npm install --save express-art-template
//配置模板引擎
app.engine('html',require('express-art-template'))
//使用：
app.get('/',function(req,res){
    //express默认会去项目中的views目录找对应的index.html视图文件
    res.render('index.html',{
        title:"hello world"
    })
})
//如果想要修改默认的views目录，则可以
// app.set('views',render函数的默认路径)



//当服务器收到get请求/的时候，执行回调处理函数
app.get('/',function(req,res){
    res.send('hello world123')
})

app.get('/about',function(req,res){
    res.send('你好,我是express!')
})

//相当于 server.listen
app.listen(3000,function(){
    console.log('app is running at port 3000.')
})

//运行 node app.js