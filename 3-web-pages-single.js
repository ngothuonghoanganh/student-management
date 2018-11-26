const http = require('http')


http.createServer()
    .on('request',(req,res) =>{
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        })
        //text/plain
        //application/xml
        //application/octet-stream
        res.write(`<html>
            <head>
                <meta charset="utf8">
                <title>NAME</title>
            </head>
                <body>
                    <h1>Ngô Thượng Hoàng Anh</h1>
                </body>
            </html>`
        ,'utf8')
        //latin1
        res.end(()=>{
            console.log('response stream ended')
        })
    })
    .on('listening',()=>{
        console.log('server is listening at port 3000')
    })
    .on('error',(err)=>{
        console.error('Server error',err)
    })
    .listen(3002)