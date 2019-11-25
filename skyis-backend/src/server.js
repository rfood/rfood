import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import api from './router';
import path from 'path';
import db from "./database/db";
import {associate, sync } from "./database/sync";


export default class Server {
    constructor(app) {
        associate();
        this.app = new express();
        this.initializeDb();
        this.middleware();
    }
    initializeDb() {
        db.authenticate()
            .then(() => {
                console.log('DB Connection is Success');
            })
            .catch(err => {
                console.error('Unable to connect to DB');
            });
    }
    middleware() {
        const { app } = this;
        app.use(morgan('dev'));
        app.use(express.json());
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
    }
    listen(port) {
        const { app } = this;
        app.listen(port, () => {
            console.log(`${port}번 포트에서 작동중`);
        });
    }
}