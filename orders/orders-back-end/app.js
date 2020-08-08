var Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3003;
app.use(express.json());
app.use(cors());
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
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
    },
    otp: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'user_details'
});

app.listen(port, '0.0.0.0', () => console.log(`Orders app listening on port ${port}!`))

app.post('/saveOTP', (req, res) => {

    let to = req.body.email;
    let otp = req.body.otp;

    return sequelize.transaction(function (t) {
        return User.update({
            otp: otp,
        }, {
            where: {
                email: to
            }
        }, { transaction: t }).then(function (car) {
            console.log('check' + car)
            res.send({ 'status': true, "message": "Records Updated Successfully" })
        });
    }).catch(function (err) {
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });
});

app.post('/validateOTP', (req, res) => {

    let to = req.body.email;
    let otp = req.body.otp;

    return sequelize.transaction(function (t) {
        return User.findOne({
            where: {
                email: to,
                otp: otp
            }
        }, { transaction: t }).then(function (car) {
            console.log('check' + car)
            res.send({ 'status': true, "message": "valid OTP" })
        });
    }).catch(function (err) {
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });
});


app.post('/sendEmail', (req, res) => {

    let to = req.body.email;
    let otp = req.body.otp;
    let text = "Your OTP for login is " + otp;


    const msg = {
        to: to,
        from: 'thanigaiselvan@dal.ca',
        subject: 'OTP - Car order application',
        text: text
    };
    sgMail
        .send(msg)
        .then(() => {
            res.send({ 'status': true, "message": "email sent successfully" })
        }, error => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
                res.send({ 'status': false, "message": "Invalid email" })
            }
        });

});

app.post('/sendOrderConfirmation', (req, res) => {

    let to = req.body.email;
    let carName = req.body.carName;
    let model = req.body.model;
    let price = req.body.price;
    let firstName = req.body.firstName;
    let text = "Hello " + firstName + " Your order containing the " + carName + " " + model + " with the total price of $" + price + " has been placed successfully";

    const msg = {
        to: to,
        from: 'thanigaiselvan@dal.ca',
        subject: 'Order confirmation',
        text: text
    };
    sgMail
        .send(msg)
        .then(() => {
            res.send({ 'status': true, "message": "email sent successfully" })
        }, error => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
                res.send({ 'status': false, "message": "Invalid email" })
            }
        });

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

    });
});

var Orders = sequelize.define('accessoriesOrders', {

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
    tableName: 'orders',
    timestamps: false
});

app.post('/insertUserOrders', (req, res) => {
    let accessoryList = req.body.accessoryList;

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

    return sequelize.transaction(function (t) {
        return Orders.bulkCreate(
            accessoryTableList
            , { transaction: t }).then(function (accessories) {
                console.log('check' + accessories)


                res.send({ 'status': true, "message": "Records Inserted Successfully" })

            });
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log('rollback' + err)
        res.send({ 'status': false, "message": err.message })

    });;




})

app.get('/getAllUserOrders/:userId', (req, res) => {
    let userId = req.params.userId
    Orders.findAll({
        where: {
            userId: userId
        }
    }).then(function (order, err) {
        if (err) {
            res.send({ 'status': false, "message": err.message })

        }
        res.send({ 'status': true, "message": order });

    })

})





module.exports = app;