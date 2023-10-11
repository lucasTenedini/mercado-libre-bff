import express from 'express';

import cors from 'cors';

import ItemController from './controller/ItemController.js';
import SearchController from './controller/SearchController.js'
import { Router } from 'express';

class Index {
    constructor() {
        this.server = express();
        this.routes();
    }

    routes() {
        this.server.use(cors());
        this.server.use(this.setRoutes());
    }

    setRoutes() {
        const routes = new Router();
        routes.get('/items/:id', ItemController.getItem);
        routes.get('/items', SearchController.getSearch);
        return routes;
    }
}

export default new Index().server.listen(3001);
