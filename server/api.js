const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db= require('./db/index.js')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});
app.get('/products/:id',async (request,response)=>{
  _id=request.params.id;
  res=await db.find({_id},1,1);
  if(res.result.length>0){
  console.log(res.result);
  response.send(res.result);
  }
  else{
    console.log("id not found")
    response.send({"res":"id not found"});
  }
})

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
