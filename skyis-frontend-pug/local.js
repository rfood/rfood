const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/public', express.static('./public'));
app.use('/', routes);

app.listen(3000, () => {
    console.log(`3000번 포트에서 작동중`);
});

