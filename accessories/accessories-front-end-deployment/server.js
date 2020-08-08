const express = require('express');
var path = require('path');

const app = express();

app.use(express.static('./dist/accessories-front-end'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/accessories-front-end/index.html'));
});


app.listen(process.env.PORT || 8080);
