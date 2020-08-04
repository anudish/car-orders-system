var Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3001;
app.use(express.json());
var sequelize = new Sequelize('cars-automobiles-team18', 'myuser@a6team18', 'qwerty@1234', {
    host: 'a6team18.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    });
    var Cars = sequelize.define('cars', {

        car_name: 
        {
         type: Sequelize.STRING,
         allowNull: false   
         },
        car_id:
        {
         type: Sequelize.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
         
        }, 
        model:
        {
            type: Sequelize.STRING,
            allowNull: false
           },
           createdAt:{
               type: Sequelize.TIME
           },
           
           updatedAt:{
               type: Sequelize.TIME
           },
           image_url:{
            type: Sequelize.STRING
           }
    }, {  tableName: 'cars'
}); 

app.listen(port, '0.0.0.0', () => console.log(`Company X app listening on port ${port}!`))

app.get('/getAllCars', (req, res) => {
   
    Cars.findOne({'car_name':'audi'}).then(function (user,err) {
        if(err){
            throw err;
        }
        console.log(user);
       
    }).catch(error => { console.log('caught', error.message); });;

    Cars.findAll({}).then(function (user,err) {
        if(err){
            throw err;
        }
        console.log(user);
       
    }).catch(error => { console.log('caught', error.message); });;
});


app.get('/insertIntoCar', (req, res) => {




      return sequelize.transaction(function (t) {
        return Cars.create({
            car_name: 'AB33C',
            model: 'AA',
            image_url :'http://sdvdABDGSJDFDHSGFGMFHHGFEBBVDVBNFFGBFERFFEF'
          }, {transaction: t}).then(function (car) {
          console.log('cehck'+car)
        });
      }).catch(function (err) {
          console.log('rollback'+err)
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
      });;
});



module.exports = app;

