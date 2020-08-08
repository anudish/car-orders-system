const { Sequelize, Op } = require('sequelize');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001;
app.use(express.json());
app.use(cors());
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
        allowNull: false,
        primaryKey: true
    },
    car_id:
    {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // primaryKey: true,
        // autoIncrement: true

    },
    model:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.TIME
    },

    updatedAt: {
        type: Sequelize.TIME
    },
    image_url: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'cars'
});

var orderHistory = sequelize.define('orderHistory', {
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
    createdAt: {
        type: Sequelize.TIME
    },
    updatedAt: {
        type: Sequelize.TIME
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    // ,
    // accessoryId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // quantityOfAccessories: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // }

},
    {
        tableName: 'orderHistory'
    });

app.listen(port, '0.0.0.0', () => console.log(`Company X app listening on port ${port}!`))

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

app.get('/getCarBySearch/:carName', (req, res) => {
    let carName = req.params.carName + '%';
    console.log("car name " + carName)

    Cars.findAll({
        where: {
            [Op.or]: [
                {
                    car_name: {
                        [Op.like]: carName
                    }
                },
                {
                    model: {
                        [Op.like]: carName
                    }
                }
            ]
        }
    }).then(function (car, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + car);

        if (car === null) {

            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            res.send({ 'status': true, "message": car });
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


app.post('/insertIntoCar', (req, res) => {
    return sequelize.transaction(function (t) {
        let car_name = req.body.car_name;
        let model = req.body.model;
        let image_url = req.body.image_url;
        let description = req.body.description;
        let price = req.body.price;

        return Cars.create({
            car_name: car_name,
            model: model,
            image_url: image_url,
            description: description,
            price: price

        }, { transaction: t }).then(function (car) {
            console.log('cehck' + car)
            res.send({ 'status': true, "message": "Records Inserted Successfully" })

        });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});

app.post('/insertOrderHistory', (req, res) => {
    return sequelize.transaction(function (t) {
        let car_name = req.body.car_name;
        let model = req.body.model;
        let userId = req.body.userId;
        let totalPrice = req.body.totalPrice;

        return orderHistory.create({
            car_name: car_name,
            model: model,
            userId: userId,
            totalPrice: totalPrice
        }, { transaction: t }).then(function (orderHistory) {
            console.log('cehck' + orderHistory)
            res.send({ 'status': true, "message": "Records Inserted Successfully" })

        });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": "Error while placing car order! " + err.message })

    });;
});

app.get('/getAllOrders', (req, res) => {

    orderHistory.findAll({}).then(function (orders, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE " + orders);
        if (orders === null) {
            console.log("response from query " + orders);
            res.send({ 'status': false, "message": "No Records Found" })

        }
        else {
            console.log(" success response from query " + orders);
            res.send({ 'status': true, 'message': orders });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
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
                    image_url: targetCarObj.image_url,
                    price: targetCarObj.price

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

app.post('/deleteCar', (req, res) => {
    let carName = req.body.car_name;
    let model = req.body.model;
    return sequelize.transaction(function (t) {
        return Cars.destroy({
            where: {
                car_name: carName,
                model: model
            }
        }, { transaction: t }).then(function (car) {
            console.log('cehck' + car)
            res.send({ 'status': true, "message": "Records Deleted Successfully" })
        });
    }).catch(function (err) {
        console.log('rollback' + err)
        // Transaction has been rolled back
        res.send({ 'status': false, "message": err.message })
        // err is whatever rejected the promise chain returned to the transaction callback
    });
})

module.exports = app;