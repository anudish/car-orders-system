var Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors');
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

    order_id:
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
        primaryKey: true,

    },
    model:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,


    },
    accessoryId:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,

    },
    qtyOfAccessories:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    totalPrice:
    {
        type: Sequelize.INTEGER,
    },
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    // createdAt: {
    //     field: 'created_at',
    //     type: Sequelize.DATE,
    // },
    // updatedAt: {
    //     field: 'updated_at',
    //     type: Sequelize.DATE,
    // },
    
}, {
    tableName: 'accessoriesOrders',
    timestamps: false
});


app.listen(port, '0.0.0.0', () => console.log(`Company Y app listening on port ${port}!`))


app.get('/getOneAccessory/:accessoryName', (req, res) => {
    let accessoryName = req.params.accessoryName;
    console.log("accessoryId " + accessoryName)

    Accessories.findOne({ where: { 'accessoryName': accessoryName} }).then(function (accessory, err) {
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


app.post('/insertIntoAccessories', (req, res) => {
    return sequelize.transaction(function (t) {
        let accessoryName = req.body.accessoryName;
        let price = req.body.price;
        let carName = req.body.carName;
        let qty = req.body.qty;
        let model = req.body.model;
        console.log(accessoryName +", " + price + ", "+ carName +", " + qty + ", " + model);
        return Accessories.create({
            model: model,
            accessoryName: accessoryName,
            carName: carName,
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

    Accessories.findOne({ where: { 'carName': carName, "accessoryName": accessoryName, "model": model } }).then(function (accessory, err) {
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

app.post('/deleteAccessory', (req, res) => {
    let accessoryName = req.body.accessoryName;
    let model = req.body.model;
    let carName = req.body.carName;

    return sequelize.transaction(function (t) {
        return Accessories.destroy({
            where: {
                accessoryName: accessoryName,
                model : model,
                carName : carName
            }
        }, { transaction: t }).then(function (accessory) {
            console.log('check' + accessory)
            if(accessory == 0){
                res.send({ 'status': true, "message": "Data with the submitted parameter not found" })
            }else{
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

// CRUD FOR ORDERS
app.get('/getAllAccessoriesOrders', (req, res) => {

    AccessoriesOrders.findAll({}).then(function (AccessoriesOrders, err) {
        if (err) {
            throw err;
        }
        console.log("RESPONSE " + AccessoriesOrders);
        if (AccessoriesOrders === null) {
            console.log("response from server " + AccessoriesOrders);
            res.send({ 'status': false, "message": "No orders Found" })

        }
        else {
            console.log(" success response from query " + AccessoriesOrders);
            res.send({ 'status': true, 'message': AccessoriesOrders });
        }

    }).catch(error => {
        console.log('Error occurred', error.message);
        res.send({ 'status': false, "message": error.message })
    });;
});


app.get('/getAllAccessoriesOrdersbyModel', (req, res) => {
    let model = req.body.model;

    AccessoriesOrders.findAll({
    where: {
        model: model
    }
    
  }).then(function (AccessoriesOrders, err) {
    if (err) {
        throw err;
    }
    console.log("RESPONSE " + AccessoriesOrders);
    if (AccessoriesOrders === null) {
        console.log("response from server " + AccessoriesOrders);
        res.send({ 'status': false, "message": "No orders Found" })

    }
    else {
        console.log(" success response from query " + AccessoriesOrders);
        res.send({ 'status': true, 'message': AccessoriesOrders });
    }

}).catch(error => {
    console.log('Error occurred', error.message);
    res.send({ 'status': false, "message": error.message })
});;
});

app.get('/getAllAccessoriesOrdersbyCar', (req, res) => {
    let carName = req.body.carName;

    AccessoriesOrders.findAll({
    where: {
        carName: carName
    }
    
  }).then(function (AccessoriesOrders, err) {
    if (err) {
        throw err;
    }
    console.log("RESPONSE " + AccessoriesOrders);
    if (AccessoriesOrders === null) {
        console.log("response from server " + AccessoriesOrders);
        res.send({ 'status': false, "message": "No orders Found" })

    }
    else {
        console.log(" success response from query " + AccessoriesOrders);
        res.send({ 'status': true, 'message': AccessoriesOrders });
    }

}).catch(error => {
    console.log('Error occurred', error.message);
    res.send({ 'status': false, "message": error.message })
});;
});


app.post('/insertAccessoriesOrders', (req, res) => {
    return sequelize.transaction(function (t) {
        let accessoryId = req.body.accessoryId;
        let user_id = req.body.user_id;
        let carName = req.body.carName;
        let order_id = req.body.order_id;
        let model = req.body.model;
        let totalPrice = req.body.totalPrice;
        let qtyOfAccessories = req.body.qtyOfAccessories;

        return AccessoriesOrders.create({
            model: model,
            accessoryId: accessoryId,
            carName: carName,
            qty: qty,
            user_id: user_id,
            order_id: order_id,
            totalPrice: totalPrice,
            qtyOfAccessories: qtyOfAccessories
            

        }, { transaction: t }).then(function (AccessoriesOrders) {
            console.log('check' + AccessoriesOrders)
            res.send({ 'status': true, "message": "Records Inserted Successfully" })

        });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;
});
app.post('/deleteAccessoryOrder', (req, res) => {
    let accessoryId = req.body.accessoryId;
    let model = req.body.model;
    let carName = req.body.carName;
    let user_id = req.body.user_id;
    let order_id = req.body.order_id;

    return sequelize.transaction(function (t) {
        return Accessories.destroy({
            where: {
                order_id: order_id,
                accessoryId: accessoryId,
                model : model,
                carName : carName,
                user_id : user_id,
            }
        }, { transaction: t }).then(function (accessory) {
            console.log('check' + accessory)
            if(accessory == 0){
                res.send({ 'status': true, "message": "Data with the submitted parameter not found" })
            }else{
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


module.exports = app;