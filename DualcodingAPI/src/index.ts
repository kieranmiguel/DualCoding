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
    app.use(express.json());
    app.get('/', (_req,res) => {
        res.send('Hello');
    });
    app.listen(3002, () => {
        console.log('Listening on localhost:3002');
    });

    

    
    
    app.post("/Users", async (req,res) => {
        const auser:user = await user.create({
            contentBody: req.body}
                ).save();
        
        res.send({auser});
    });

   app.get("/Users", async (_req, res) => {
        const auser = await user.find({where: {id: 12}});

        res.send({auser});
    });

})();
