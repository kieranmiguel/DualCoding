"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const user_1 = require("./entities/user");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: 'postgres',
        database: 'DualCodingDB',
        username: 'admin',
        password: 'admin',
        host: 'localhost',
        entities: [path_1.join(__dirname, "./entities/*.*")],
        logging: true,
        synchronize: true
    });
    const app = express_1.default();
    app.use(express_1.default.json());
    app.get('/', (_req, res) => {
        res.send('Hello');
    });
    app.listen(3002, () => {
        console.log('Listening on localhost:3002');
    });
    app.post("/Users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const auser = yield user_1.user.create({
            contentBody: req.body
        }).save();
        res.send({ auser });
    }));
    app.get("/Users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const auser = yield user_1.user.find({ where: { id: 12 } });
        res.send({ auser });
    }));
}))();
//# sourceMappingURL=index.js.map