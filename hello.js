const http = require('http')

const requesListener = (req,res) =>{
    res.end('hello KEN')
}

//creat server
const server = http.createServer(requesListener)

//start server
server.listen(11001,()=>{
    console.log('server is listening at port 3000')
})

console.log('HET FILE')