import express from 'express';
import router from './router';
const app = express();
const port = process.env.PORT || 4000
import db from 'database/db';

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/ingredient', (req, res) => {

});


export default app;
