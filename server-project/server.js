const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const mysql = require('mysql')


app.use(bodyParser.json());

app.use(cors({
  origin: `http://localhost:3001`
}));

const db = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"password",
  database:"customer_db"
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/submit-form', (req,res) =>{
  const {FirstName, LastName, Age, Country } = req.body;

  db.query(
    "INSERT INTO company_customers (FirstName,LastName,Age,Country) VALUES (?,?,?,?)",
    [FirstName, LastName, Age, Country],
    (err,result) =>{
      if (err){
        console.log(err)
      }
      db.query(
        "SELECT * FROM company_customers WHERE id = ?", // Replace 'ID' with the actual primary key column name if it's different
        [result.insertId],
        (err, selectResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          // Send back the result of the SELECT query
          const newCustomer = { id: selectResult.insertId, FirstName, LastName, Age, Country };
          res.status(200).json(newCustomer);
        }
      );
    }
  );
});

app.post('/update-customer', (req,res) =>{
  const {FirstName, LastName, Age, Country, id} = req.body;

  db.query(
    'UPDATE company_customers SET FirstName = ?, LastName = ?, Age = ?, Country = ? WHERE id = ?',
    [FirstName, LastName, Age, Country, id],
    (err,result) =>{
      if (err){
        console.log(err)
      }
      db.query(
        "SELECT * FROM company_customers WHERE id = ?", // Replace 'ID' with the actual primary key column name if it's different
        [result.insertId],
        (err, selectResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          // Send back the result of the SELECT query
          const newCustomer = { id: selectResult.insertId, FirstName, LastName, Age, Country };
          res.status(200).json(newCustomer);
        }
      );
    }
  );
});

app.get('/get-all-customers', (req, res) => {
  // SQL query to select all customers from the database
  db.query('SELECT * FROM heroku_a4dd5bb9dfba4af.company_customers', (error, results) => {
    if (error) {
      // If there's an error, send a server error response
      return res.status(500).send('Error fetching customers');
    }
    if (results.length === 0) {
      // If the results array is empty, send an empty array response
      return res.status(200).json([]);
    }
    // Send the results back to the client
    res.status(200).json(results);
  });
});

app.delete('/delete-customer'), (req, res) => {
  const id= req.body;
  console.log(id)
  db.query('DELETE FROM heroku_a4dd5bb9dfba4af.company_customers WHERE id =?',
  [id],
  (error, results) => {
    if (error) {
      // If there's an error, send a server error response
      return res.status(500).send('Error fetching customers');
    }
    // Send the results back to the client
    res.status(200).json(results);
  });
}

app.delete('/delete-customer', (req, res) => {
  const id = req.body.id;
  // Simulate deletion logic
  db.query('DELETE FROM heroku_a4dd5bb9dfba4af.company_customers WHERE id =?',
    [id],
    (error, results) => {
      if (error) {
        // If there's an error, send a server error response
        return res.status(500).send('Error fetching customers');
      }
      // Send the results back to the client
      
      res.status(200).json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});