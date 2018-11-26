const http = require('http')

//web API   

const MEMBERS = [{name: 'Hoàng anh', age: 18}]

const onDefaulRoute=function (req,res){
    res.write(`<html>
    <head>
        <meta charset="utf8">
        <title>NAME</title>
    </head>
        <body>
            <h1>Ngô Thượng Hoàng Anh</h1>
            <a href="/member">xem danh sach</a>
        </body>
    </html>`
,'utf8')
}

const onMemberListRoute = function(req,res){
    res.write(`<html>
    <head>
        <meta charset="utf8">
        <title>NAME</title>
    </head>
        <body>
            <h1>dan sach lop</h1>
            <table border="1" cellpadding="10" cellspacing="5">`)
    res.write(`<tr><td>NO DATA</td></tr>`)
    res.write(`</table>
            <a href="/">trang chu</a>
        </body>
    </html>`
    ,'utf8')
}
http.createServer()
    .on('request',(req,res) =>{ //on request xay ra khi co mot request den server
        //const method=req.method
        //const url = req.url
        const{method,url}=req //destructuring ES6
        // console.log({method,url})
        let handler 
        if(method === 'GET' && url ==='/'){
            handler = onDefaulRoute
        }
        else if (method === 'GET' && url ==='/member'){
            handler = onMemberListRoute
        }
        if(!handler){
            res.writeHead(404)
            return res.end()
        }
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        })
        handler(req,res)
        res.end(()=>{})
    })
    .on('listening',()=>{
        console.log('server is listening at port 3000')
    })
    .on('error',(err)=>{
        console.error('Server error',err)
    })
    .listen(3003)