var Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3002;
const cors = require('cors');
const { where } = require('sequelize');
app.use(cors());

app.use(express.json());
var sequelize = new Sequelize('a6', 'admin', 'CompanyY1234', {
    //var sequelize = new Sequelize('a6', 'root', 'B00837967', {
    host: 'team-18-company-y-5409.cmxwmytkf5yh.us-east-1.rds.amazonaws.com',
    //host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
var Accessories = sequelize.define('accessories', {

    accessoryName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    accessoryId:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    carName:
    {
        type: Sequelize.STRING,
        allowNull: false,

    },
    model:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qty:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.TIME
    },

    updatedAt: {
        type: Sequelize.TIME
    },
}, {
    tableName: 'accessories'
});


var AccessoriesOrders = sequelize.define('accessoriesOrders', {

    orderId:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    carName:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    totalPrice:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accessoryName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'accessoriesOrders',
    timestamps: false
});


var OrderAccesoryDetail = sequelize.define('orderAccesoryDetail', {
    id:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    orderId:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

    },
    accessoryName:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,

    }
}, {
    tableName: 'orderAccesoryDetail',
    timestamps: false
});


app.listen(port, '0.0.0.0', () => console.log(`Company Y app listening on port ${port}!`))


app.get('/getOneAccessory/:accessoryName', (req, res) => {
    let accessoryName = req.params.accessoryName;
    console.log("accessoryId " + accessoryName)
    Accessories.findAll({ where: { 'accessoryName': accessoryName.toLowerCase() } }).then(function (accessory, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + accessory);

        if (accessory === null) {
            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            res.send({ 'status': true, "message": accessory });
        }
    }).catch(error => {

        console.log('caught', error.message);
        res.send({ 'status': false, "message": error.message })

    });;
});

app.get('/getAllAccessories', (req, res) => {

    Accessories.findAll({}).then(function (accessories, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE " + accessories);
        if (accessories === null) {
            console.log("response from query " + accessories);
            res.send({ 'status': false, "message": "No Records Found" })

        }
        else {
            console.log(" success response from query " + accessories);
            res.send({ 'status': true, 'message': accessories });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
    });;
});

app.get('/getCarAccessories/:carName/:model', (req, res) => {
    let carName = req.params.carName;
    let model = req.params.model;
    let accessory_list = [];
    let acc = []
    Accessories.findAll({ where: { 'carName': carName.toLowerCase(), 'model': model.toLowerCase() } }).then(function (accessories, err) {
        if (err) {
            throw err;
        }
        console.log("Response from sql " + accessories);
        if (accessories === null) {
            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            accessories.forEach(one => {
                let accessory = one.dataValues;
                //console.log(accessory.accessoryName);
                if (accessory.accessoryName === "winter_tires" && accessory.qty >= 4) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price * 4
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "head_lights" && accessory.qty >= 2) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price * 2
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "back_lights" && accessory.qty >= 2) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price * 2
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "music_system" && accessory.qty >= 1) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "smart_navigation_system" && accessory.qty >= 1) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "autopilot" && accessory.qty >= 1) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "safe_parking_system" && accessory.qty >= 1) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price
                    };
                    accessory_list.push(temp)
                } else if (accessory.accessoryName === "all_round_protection_guard" && accessory.qty >= 1) {
                    let temp = {
                        accessoryName: accessory.accessoryName,
                        price: accessory.price
                    };
                    accessory_list.push(temp)
                }
            });
            console.log(accessory_list);
            res.send({ 'status': true, "message": accessory_list });
        }
    }).catch(error => {

        console.log('caught', error.message);
        res.send({ 'status': false, "message": error.message })

    });;
});

app.post('/insertIntoAccessories', (req, res) => {
    return sequelize.transaction(function (t) {
        let accessoryName = req.body.accessoryName;
        let price = req.body.price;
        let carName = req.body.carName;
        let qty = req.body.qty;
        let model = req.body.model;
        console.log(accessoryName + ", " + price + ", " + carName + ", " + qty + ", " + model);
        return Accessories.create({
            model: model.toLowerCase(),
            accessoryName: accessoryName.toLowerCase(),
            carName: carName.toLowerCase(),
            qty: qty,
            price: price

        }, { transaction: t }).then(function (accessories) {
            console.log('check' + accessories)
            res.send({ 'status': true, "message": "Records Inserted Successfully" })

        });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});

app.put('/updateAccessory', (req, res) => {

    let accessoryName = req.body.accessoryName;
    let carName = req.body.carName;
    let model = req.body.model;
    let price = req.body.price;
    let qty = req.body.qty;

    Accessories.findOne({ where: { 'carName': carName.toLowerCase(), "accessoryName": accessoryName.toLowerCase(), "model": model.toLowerCase() } }).then(function (accessory, err) {
        if (err) {
            throw err;
        }

        if (accessory === null) {

            res.send({ 'status': false, "message": "No Records Found" })
        }
        else {
            return sequelize.transaction(function (t) {
                return Accessories.update({
                    price: price,
                    qty: qty,
                }, {
                    where: {
                        carName: carName,
                        model: model,
                        accessoryName: accessoryName
                    }
                }, { transaction: t }).then(function (accessory) {
                    console.log('check' + accessory)
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

app.post('/insertIntoAccessoriesOrders', (req, res) => {
    let Stringabc = "";
    let accessoryList = req.body.accessoryList;

    console.log(Stringabc);
    let totalPrice = req.body.totalPrice;
    let carName = req.body.carName;
    let model = req.body.model;
    let userId = req.body.userId;

    accessoryTableList = []

    accessoriesUpdateList = []
    accessoryList.forEach(one => {

        accessoryTableList.push({
            model: model,
            carName: carName,
            userId: userId.toLowerCase(),
            totalPrice: totalPrice,
            accessoryName: one.accessoryName,
            price: one.price
        });

    });
    console.log(accessoryTableList);
    return sequelize.transaction(function (t) {
        return AccessoriesOrders.bulkCreate(
            accessoryTableList
            , { transaction: t }).then(function (accessories) {
                console.log('check' + accessories)
                accessoryTableList.forEach(element => {
                    console.log('checlllefjd')
                    var currentQuantity = 0;

                    if (element.accessoryName === "winter_tires") {
                        currentQuantity = 4
                    } else if (element.accessoryName === "head_lights" || element.accessoryName === "back_lights") {
                        currentQuantity = 2
                    } else if (element.accessoryName === "music_system" ||
                        element.accessoryName === "smart_navigation_system" ||
                        element.accessoryName === "autopilot" ||
                        element.accessoryName === "safe_parking_system" || element.accessoryName === "all_round_protection_guard"
                    ) {
                        currentQuantity = 1
                    }
                    const acc = Accessories.findOne({
                        where: {
                            accessoryName: element.accessoryName,
                            carName: carName,
                            model: model
                        }
                    }, { transaction: t }).then(function (ans) {
                        Accessories.update({ qty: ans.qty - currentQuantity }, {
                            where: {
                                accessoryName: element.accessoryName,
                                carName: carName,
                                model: model
                            }
                        }, { transaction: t }).then(function (accessory, err) {
                            console.log('check' + accessory)
                            if (err) {
                                throw err
                            }
                            //res.send({ 'status': true, "message": "Records Updated Successfully" })
                        })
                    })



                });

                res.send({ 'status': true, "message": "Records Inserted Successfully" })

            });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});


app.post('/deleteAccessory', (req, res) => {
    let accessoryName = req.body.accessoryName;
    let model = req.body.model;
    let carName = req.body.carName;

    return sequelize.transaction(function (t) {
        return Accessories.destroy({
            where: {
                accessoryName: accessoryName.toLowerCase(),
                model: model.toLowerCase(),
                carName: carName.toLowerCase()
            }
        }, { transaction: t }).then(function (accessory) {
            console.log('check' + accessory)
            if (accessory == 0) {
                res.send({ 'status': true, "message": "Data with the submitted parameter not found" })
            } else {
                res.send({ 'status': true, "message": "Records Deleted Successfully" })
            }
        });
    }).catch(function (err) {
        console.log('rollback' + err)
        // Transaction has been rolled back
        res.send({ 'status': false, "message": err.message })
        // err is whatever rejected the promise chain returned to the transaction callback
    });
})
app.get('/getOrderDetails', (req, res) => {
    let userId = req.body.userId;
    console.log(userId);
    AccessoriesOrders.findAll({ where: { userId: userId.toLowerCase() } }).then(function (accessories, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE" + accessories + "anand");
        if (accessories[0] == null) {
            console.log("response from query " + accessories);
            res.send({ 'status': false, "message": "No Records Found" })

        }

        else {
            console.log(" success response from query " + accessories);
            let temp = accessories;
            let result = [{}];
            result.pop();
            temp.forEach(one => {
                accesroies = one.accessoryList.split(",");
                console.log(accesroies);
                accesroies.pop();
                resp = {
                    carName: one.carName,
                    model: one.model,
                    totalPrice: one.totalPrice,
                    accessoryList: accesroies
                }
                result.push(resp);
            });
            res.send({ 'status': true, 'message': result });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
    });;
});

app.get('/getAllOrderDetails', (req, res) => {
    AccessoriesOrders.findAll({}).then(function (accessories, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE" + accessories + "anand");
        if (accessories[0] == null) {
            console.log("response from query " + accessories);
            res.send({ 'status': false, "message": "No Records Found" })

        }

        else {
            res.send({ 'status': true, 'message': accessories });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
    });;
});

module.exports = app;
