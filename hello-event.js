const http = require('http')


//event-driven style
//option 1
// const server =http.createServer()


// server.on('request',(req,res) =>{
//     res.end('hello KEN and NHUNG')
// })

// server.on('listening',()=>{
//     console.log('server is listening at port 3000')
// })

// server.listen(3000)

//option 2
// call-chaining
http.createServer()
    .on('request',(req,res) =>{
    res.end('I love NHUNG')
                            })
    .on('listening',()=>{
    console.log('server is listening at port 3000')
                            })
    .listen(3000)