const express = require('express');
var path = require('path');

const app = express();

app.use(express.static('./dist/carautomobiles-frontend'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/carautomobiles-frontend/index.html'));
});


app.listen(process.env.PORT || 8080);
