import "reflect-metadata"
import express from 'express'
import {createConnection} from 'typeorm'
import{__prod__} from "./constants";
import {join} from "path";
import { user } from "./entities/user";

(async () => {
    await createConnection({
        type:'postgres',
        database: 'DualCodingDB',
        username:'admin',
        password: 'admin',
        host: 'localhost',
        entities: [join(__dirname, "./entities/*.*")],
        logging: true,
        synchronize: true
    });
    
    const app = express();
    app.use(function(_req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        next();
      });
    app.use(express.json());
    app.get('/', (_req,res) => {
        res.send('Hello');
    });
    app.listen(3002, () => {
        console.log('Listening on localhost:3002');
    });

    
    

    
    
    app.post("/Users", async (req,res) => {
        console.dir(req.body)
        const auser:user = await user.create({
            contentBody: req.body,
            createdBy: 1,
            }).save();
        
        res.send({auser});
    });

   app.get("/Users", async (_req, res) => {
       console.log(_req.query.id)
        const auser = await user.find({where: {id: _req.query.id}});
        

        res.send({auser});
    });

})();
