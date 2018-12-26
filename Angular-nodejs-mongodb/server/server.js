const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')//lúc insert dữ liệu
// const path = require('path');

const api = require('./routes/api');//gọi bên api.js
const port = 3000;

const app = express();
app.use(cors())
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
// app.get('/',function(req,res){
//     res.send('hello world')
// })
// app.get('register',function(req,res){
//     res.send('hello register')
// })

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});