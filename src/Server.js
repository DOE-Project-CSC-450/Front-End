const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "spectrasearchdatabase"
});
var sql2;
var ignore;
con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
  /*  sql2 = 'SELECT * FROM `Spectral Distribution Fields`';
  ignore = "DELETE FROM `Spectral Distribution Fields` WHERE 'SpectralQuantity' = 'able'";
  con.query(ignore, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });  */
});

app.use(cors());


app.get('/', (req, res) => {
  res.send("hello from the lighting server");

})



/* app.get('products/add', (req, res) =>{
  const {value, SpectralQKey} = req.query;
  console.log(value, SpectralQKey);
  res.send("adding product");
  //to insert things into the database not done
})
 */
app.post('/lighting', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);
  console.log("do we make it here tho")
  console.log("show me", body.SpectraSearchID)
  if (body.reportData === undefined) {
    var practice = 'INSERT INTO `Header Element Fields`(`SpectraSearchID`, `Name`, `Manufacturer`, `CatalogNumber`, `Description`, `DocumentCreator`, `UniqueIdentifier`, `MeasurementEquipment`, `Laboratory`, `ReportNumber`, `Comments`, `Application`, `Type`, `Technology`) VALUES (' + body.SpectraSearchID + ', "' + body.Name + '", "' + body.manufacturer + '", "' + body.catalogNumber + '", "' + body.description + '", "' + body.docCreat + '", "' + body.uniqueIdent + '", "' + body.measureEquip + '", "' + body.labratory + '", "' + body.reportNum + '", "' + body.Comments + '", "' + body.Application + '", "' + body.Type + '", "' + body.Technology + '")'
  }
  else {
    var practice = 'INSERT INTO `Header Element Fields`(`SpectraSearchID`, `Name`, `Manufacturer`, `CatalogNumber`, `Description`, `DocumentCreator`, `UniqueIdentifier`, `MeasurementEquipment`, `Laboratory`, `ReportNumber`, `ReportDate`, `Comments`, `Application`, `Type`, `Technology`) VALUES (' + body.SpectraSearchID + ', "' + body.Name + '", "' + body.manufacturer + '", "' + body.catalogNumber + '", "' + body.description + '", "' + body.docCreat + '", "' + body.uniqueIdent + '", "' + body.measureEquip + '", "' + body.labratory + '", "' + body.reportNum + '", "' + body.reportData + '", "' + body.Comments + '", "' + body.Application + '", "' + body.Type + '", "' + body.Technology + '")'
  }
  con.query(practice, function (err, result) {
    if (err) throw err;
    console.log("inserted " + result);
  });
  result.send({ message: 'Success' })
});



app.get('/lighting', (req, res) => {
  con.query('SELECT * FROM `Header Element Fields`', (err, results) => {
    if (err) {
      return res.send(error);
    }
    else {
      return res.json({
        data: results
      })
    }
  });
})


app.get('/users', (req, res) => {
  con.query('SELECT * FROM `USERS`', (err, results) => {
    if (err) {
      return res.send(error);
    }
    else {
      return res.json({
        data: results
      })
    }
  });
})

app.post('/users', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);
  console.log("do we make it here tho")
  console.log("show me", body.usernames)

  var practice2 = 'INSERT INTO `USERS`(`Username`, `Password`) VALUES ("' + body.usernames + '", "' + body.passwords + '")'
  con.query(practice2, function (err, result) {
    if (err) throw err;
    console.log("inserted " + result);
  });
  result.send({ message: 'Success' })
});



app.get('/SpectralData', (req, res) => {
  con.query('SELECT * FROM `spectraldistributionfields`', (err, results) => {
    if (err) {
      return res.send(error);
    }
    else {
      return res.json({
        data: results
      })
    }
  });
})

app.post('/SpectralData', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);

  var practice3 = 'INSERT INTO `spectraldistributionfields`(`SpectraSearchID`, `SpectralData`) VALUES ("' + body.SpectraSearchID + '", "' + body.specData + '")'
  con.query(practice3, function (err, result) {
    if (err) throw err;
    console.log("inserted spectral result " + result);
  });
  result.send({ message: 'Success' })
});


app.get('/metrics', (req, res) => {
  con.query('SELECT * FROM `metrics`', (err, results) => {
    if (err) {
      return res.send(error);
    }
    else {
      return res.json({
        data: results
      })
    }
  });
})

app.post('/metrics', (req, result) => {
  result.set('Access-Control-Allow-Origin', '*');
  console.log("this?", typeof (req), "and", typeof (req.body));
  const body = (req.body);

  var practice4 = 'INSERT INTO `metrics`(`SpectraSearchID`, `lumens`, `watts`, `volts`) VALUES ("' + body.SpectraSearchID + '", "' + body.lumens + '", "' + body.watts + '", "' + body.volts + '")'
  con.query(practice4, function (err, result) {
    if (err) {throw err};
    console.log("inserted spectral result " + result);
  });
  result.send({ message: 'Success' })
});










app.listen(4000, () => {
  console.log("lighting server listening on port 4000");
  console.log("somethings happening");
})



//user logs in verify email
//any person can make an account
//lighting manufacturers send doe bulk technical sheets so must of it is stuff they already have
//upload and download, download in different forms
//ies, xml text file, and

//make an admin page
