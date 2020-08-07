var Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3003;
app.use(express.json());
var sequelize = new Sequelize('cars-orders-team18', 'companyz@companyzdb', 'qwerty@123', {
    host: 'companyzdb.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
var User = sequelize.define('user_details', {

    firstName:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    id:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    lastName:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.TIME
    },

    updatedAt: {
        type: Sequelize.TIME
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'user_details'
});

app.listen(port, '0.0.0.0', () => console.log(`Orders app listening on port ${port}!`))

app.get('/getOneCar/:carName/:model', (req, res) => {
    let carName = req.params.carName;
    let model = req.params.model;
    console.log("car name " + carName)
    console.log("model " + model)

    Cars.findOne({ where: { 'car_name': carName, "model": model } }).then(function (car, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + car);

        if (car === null) {

            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            res.send(car);
        }


    }).catch(error => {

        console.log('caught', error.message);
        res.send({ 'status': false, "message": error.message })

    });;


});

app.get('/getAllCars', (req, res) => {

    Cars.findAll({}).then(function (cars, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE " + cars);
        if (cars === null) {
            console.log("response from query " + cars);
            res.send({ 'status': false, "message": "No Records Found" })

        }
        else {
            console.log(" success response from query " + cars);
            res.send({ 'status': true, 'message': cars });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
    });;
});


app.post('/registerUser', (req, res) => {
    let email = req.body.email;

    User.findOne({ where: { 'email': email } }).then(function (user, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + user);

        if (user === null) {
            console.log("find one query  empty " + user)

            return sequelize.transaction(function (t) {
                let firstName = req.body.firstName;
                let lastName = req.body.lastName;
                // let email = req.body.email;
                let password = req.body.password;

                return User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password

                }, { transaction: t }).then(function (u) {
                    console.log('check' + u)
                    res.send({ 'status': true, "message": "User Registered Successfully", "data": user })

                });
            })

            // res.send({ 'status': false, "message": "User Already Exist! Login" })
        }
        else {
            res.send({ 'status': false, "message": "alreadyRegistered", "data": user })
        }


    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log("req email " + email)
    console.log("req password " + password)

    User.findOne({ where: { 'email': email, 'password': password } }).then(function (user, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + user);

        if (user === null) {
            console.log("find one query empty not present " + user)

            res.send({ 'status': false, "message": "Login Failed! Invalid EmailId or Password" })
        }
        else {
            res.send({ 'status': true, "message": user })
        }


    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});






app.post('/updateCar', (req, res) => {

    let car_name = req.body.car_name;
    let model = req.body.model;

    let targetCarObj = req.body.change;
    console.log("req body car name" + car_name)
    console.log("req body car model" + model)


    Cars.findOne({ where: { 'car_name': car_name, "model": model } }).then(function (car, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + car);

        if (car === null) {

            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            return sequelize.transaction(function (t) {
                return Cars.update({
                    model: targetCarObj.model,
                    car_name: targetCarObj.car_name,
                    description: targetCarObj.description,
                    image_url: targetCarObj.image_url

                }, {
                    where: {
                        car_name: car_name,
                        model: model
                    }
                }, { transaction: t }).then(function (car) {
                    console.log('check' + car)
                    res.send({ 'status': true, "message": "Records Updated Successfully" })
                });
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                console.log('rollback' + err)
                res.send({ 'status': false, "message": err.message })

            });
        }


    })

});



module.exports = app;