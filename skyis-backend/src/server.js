import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import api from './router';
import path from 'path';
import db from "./database/db";

require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 8001);


app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser('skyissecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use('/api', api);

db.authenticate()
    .then(() => {
        console.log('connection success');
    })
    .catch(err => {
        console.error('unable connection');
    });

/*
app.use((req, res, next) => {
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
});


app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
*/
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
