const fs = require('fs')
const http = require('http')

//web API   

const MEMBERS = [{name: 'Hoàng Anh', age: 18},
                 {name: 'Ngọc Nhung', age: 17}
                ]

const onDefaulRoute=function (req,res, done){
    fs.readFile(`views/default.html`,'utf8',(err,html) => {
        if (err){
            console.error(err)
            res.writeHead(500)
            done()
            return
        }
        res.write(html,'utf8')
        done()
    })
}


const onMemberListRoute = function(req,res,done){
    fs.readFile(`views/list-mamber.html`,'utf8',(err,html) => {
        if (err){
            console.error(err)
            res.writeHead(500)
            done()
            return
        }
        let rows=``
        if (MEMBERS.length ==0){
            rows='<tr><td>NO DATA</td></tr>'
        }
        else{
            // rows += `
            //     <tr>
            //     <th>Tên</th>
            //     <th>Tuổi</th>
            //     </tr>
            //     `
            // for (let men of MEMBERS){
            //     rows += `
            //     <tr>
            //     <td>${men.name}</td>
            //     <td>${men.age}</td>
            //     </tr>
            //     `
            // }
            rows =MEMBERS.map(men=>
                `<tr>
                   <td>${men.name}</td>
                   <td>${men.age}</td>
                   </tr>`
                )
        }
        const content = html.replace('{{rows}}',rows)
        res.write(content,'utf8')
        done()
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