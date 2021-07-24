import "reflect-metadata";
import express from 'express';
import {createConnection, EntitySubscriberInterface, EventSubscriber, getConnection, UpdateEvent} from 'typeorm';

import{__prod__} from "./constants";
require("dotenv-safe").config();
import {join} from "path";
import { user } from "./entities/user";
import { ProductSubscriber } from "./ProductSubscriber";
import { Strategy as GitHubStrategy } from "passport-github";
import passport from "passport";
import jwt from 'jsonwebtoken';


(async () => {
     await createConnection({   //Database Connection
        type:'postgres',
        database: 'DualCodingDB',
        username:'admin',
        password: 'admin',
        host: 'localhost',
        dropSchema:true,
        entities: [join(__dirname, "./entities/*.*")],
        logging: true,
        synchronize: true
    });


    const subsriber = new ProductSubscriber(); //Database Watcher

    
    
    const app = express();
    app.use(passport.initialize());
    passport.serializeUser((user: any, done) =>{
        done(null, user.accessToken);
    });

    passport.use(                                                             //Passport GitHub OAuth
        new GitHubStrategy(
        {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/auth/github/callback"
      },
      async (__, _, profile, cb) => {
            let user1 = await user.findOne({where: {githubID: profile.id}});
            if(user1){
            
            }
            else{
                let body: string[] = [''];
            user1 = await user.create({name: profile.displayName, githubID: profile.id, contentBody: body }).save();
            }
        
            
            console.log(profile);
            cb(null, {accessToken: jwt.sign({userId: user1.id}, process.env.JSON_WEB_TOKEN, {expiresIn: '1y'}), refreshToken: ''});
        }
        )
    );   
    

    app.get('/auth/github', passport.authenticate('github', {session: false }));

    app.get('/auth/github/callback', 
    passport.authenticate('github', {session: false }),
    (req :any, res) => {
        res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`);
    });

        
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

    app.put("/Users", async (_req,res) => {
        
        console.dir(_req.body);

        await getConnection()
        .createQueryBuilder()
        .update(user)
        .set({ contentBody: _req.body.pageData})
        .where("id = :id", { id: _req.query.id})
        .execute();
        /*
        const auser = await user.find({where: {id: _req.query.id}});
        if(!auser){
            res.send({auser:null});
            return;
        }
            auser.contentBody = req.body.pageData;
            await auser.save();
        */
        res.send({user});
        
    });
    

    
    
    app.post("/Users", async (req,res) => {
        
        console.dir(req.body);
        const auser:user = await user.create({
            contentBody: req.body.pageData,
            }).save();
        
        res.send({auser});
        
    });

   app.get("/Users", async (_req, res) => {
       console.log(_req.query.id);
        const auser = await user.find({where: {id: _req.query.id}});
        
            
        res.send({auser});
    });

})();
