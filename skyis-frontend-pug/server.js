import express from 'express';

export default class Server {
    constructor(app) {
        this.app = new express();
        this.middleware();
    }
    middleware() {
        const { app } = this;
        app.set('view engine', 'pug');
        app.set('views', './views');
    }
    listen(port) {
        const { app } = this;
        app.listen(port, () => {
            console.log(`${port}번 포트에서 작동중`);
        });
    }
}