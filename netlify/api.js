import bodyParser from "body-parser";
import express, { Router } from "express";
import serverless from "serverless-http";
// const express = require('express')
// const app = express()
// const initRoutes = require('../src/routes/web')
// Khởi tạo các routes cho ứng dụng
// initRoutes(app)
const PORT = 3001;
const router = Router();
const api = express();
api.use(bodyParser.json())


router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);




// Cho phép lý dữ liệu từ form method POST
api.use(express.urlencoded({extended: true}))




// api.listen(PORT, () => {
//   console.log(`Hello trungquandev.com, I'm running at localhost:${port}/`)
// })

export const handler = serverless(api);
