const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'sample-db'
};

app.get('/', (req,res) => {
  const connection = mysql.createConnection(config);
  connection.query(`SELECT * FROM course_modules`, (err, queryResult) => {
    connection.end();

    if (err) {
      throw err;
    }

    const result = '<h1>Course modules:</h1><ul>' +
      queryResult.map(entry => `<li>${entry.name}</li>`).join('') +
      '</ul>';

    res.send(result);
  });
});

app.listen(port, ()=> {
  console.log('Running on port ' + port);
});