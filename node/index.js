const express = require('express');
const app = express();
const csv = require('csv-parser');  
const fs = require('fs');
const port = 5555;

var MyData = [];
var count = 0;

fs.createReadStream('All_India_pincode_data_26022018.csv')  
  .pipe(csv())
  .on('data', (row) => {
    count++;
    	var obj = {
    		"officename":row['officename'],
    		"pincode":row['pincode'],
    		"id": count
    	}	
    	MyData.push(obj);    
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.get('/', (request, response) => {
  var pageNo = parseInt(request.query.pageNo)
  var paginatedData = getPaginatedData(pageNo)
  response.send(paginatedData)
})

function getPaginatedData(pageNo){
  var data = []
  console.log(MyData.length)
  switch(pageNo) {
    case 1:
       data = MyData.slice(0, 15000);
      break;
    case 2:
       data = MyData.slice(15000, 30000);
      break;
    case 3:
       data = MyData.slice(30000, 45000);
      break;
    case 4:
       data = MyData.slice(45000, 60000);
      break;
    case 5:
       data = MyData.slice(60000, 75000);
      break;
    case 6:
       data = MyData.slice(75000, 90000);
      break;
    case 7:
       data = MyData.slice(90000, 105000);
      break;
    case 8:
       data = MyData.slice(105000, 120000);
      break;
    case 9:
       data = MyData.slice(120000, 135000);
      break;
    case 10:
       data = MyData.slice(135000,);
      break;    
    default:
       data =  MyData.slice(0, 15000);
  }
  return data;
}

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})