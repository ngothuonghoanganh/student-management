const fs = require('fs')
const http = require('http')

//web API   

const MEMBERS = [{name: 'Hoàng Anh', age: 18},
                 {name: 'Ngọc Nhung', age: 17}
                ]

const reafileAssync = function (filePath) {
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath,'utf8',(err,data) => {
            if (err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

//option 2 const reafileAssync=util.promisesify

const onDefaulRoute=function (req,res){
    return reafileAssync(`views/default.html`)
        .then(html=>{
            res.write(html,'utf8')
        })
        .catch(err=>{
            console.error(err)
            res.writeHead(500)
        })
}


const onMemberListRoute = function(req,res){
    return reafileAssync(`views/list-mamber.html`)
        .then(html=>{
            let rows=``
            if (MEMBERS.length == 0){
                rows='<tr><td>NO DATA</td></tr>'
            }
            else{
                rows =MEMBERS.map(men=>
                    `<tr>
                       <td>${men.name}</td>
                       <td>${men.age}</td>
                       </tr>`
                    )
                    .reduce((prev,cur) => prev + cur, '')
            }
            const content = html.replace('{{rows}}',rows)
            res.write(content,'utf8')
        })
        .catch(err=>{
            console.error(err)
            res.writeHead(500)
        })
    }


const HANDLER = {
    'GET /': onDefaulRoute,
    'GET /member': onMemberListRoute
}

http.createServer()
    .on('request',(req,res) =>{
        const{method,url}=req
        const route = `${method} ${url}`
        const handler= HANDLER[route]
        if(!handler){
            res.writeHead(404)
            return res.end()
        }
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        })
        handler(req,res, () => {
            res.end()
        })
        
    })
    .on('listening',()=>{
        console.log('server is listening at port 3000')
    })
    .on('error',(err)=>{
        console.error('Server error',err)
    })
    .listen(3004)