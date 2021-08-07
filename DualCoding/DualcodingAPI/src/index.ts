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
import cors from "cors";
import { isAuth } from "./isAuth";
import { page } from "./entities/page";


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
    app.use(cors({origin: "*"}));
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
                
            user1 = await user.create({name: profile.username, githubID: profile.id}).save();
            }
        
            
            console.log(profile);
            cb(null, {accessToken: jwt.sign({userId: user1.id}, process.env.JSON_WEB_TOKEN, {expiresIn: '1y'}), refreshToken: ''});
        }
        )
    );   

        //User Auth
    app.get("/me", async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          res.send({ user: null });
          return;
        }
    
        const token = authHeader.split(" ")[1];
        if (!token) {
          res.send({ user: null });
          return;
        }
    
        let userId = "";
    
        try {
          const payload: any = jwt.verify(token, process.env.JSON_WEB_TOKEN);
          userId = payload.userId;
        } catch (err) {
          res.send({ user: null });
          return;
        }
    
        if (!userId) {
          res.send({ user: null });
          return;
        }
    
        const user1 = await user.findOne(userId);
    
        res.send({ user1 });
      });
    

    app.get('/auth/github', passport.authenticate('github', {session: false }));

    app.get('/auth/github/callback', 
    passport.authenticate('github', {session: false }),
    (req:any, res) => {
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

    //CRUD Routes
    
    app.post("/page", isAuth, async (req, res) => {

      const apage = await page.findOne(req.body.address);
    if (!apage) {
      const apage:page = await page.create({
        contentBody: req.body.pageData,
        address:req.body.address
        }).save();
        res.send({ apage });
         return;
    }
    if (apage.creatorId !== req.user) {
      throw new Error("not authorized");
    }

    apage.contentBody = req.body.pageData;
    await apage.save();
    res.send({ page });
  });


   app.get("/Users", async (_req, res) => {
       console.log(_req.query.id);
        const auser = await user.find({where: {id: _req.query.id}});
        
            
        res.send({auser});
    });

})();
