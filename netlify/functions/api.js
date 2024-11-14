import bodyParser from "body-parser";
import express, { Router } from "express";
import serverless from "serverless-http";
const emailController = require('../../src/controllers/emailController')

// const express = require('express')
// const app = express()
// const initRoutes = require('../src/routes/web')
// Khởi tạo các routes cho ứng dụng
// initRoutes(app)
const PORT = 3001;
const router = Router();
const api = express();
api.use(bodyParser.json())

// Cho phép lý dữ liệu từ form method POST
api.use(express.urlencoded({extended: true}))
router.post('/send-email', emailController.sendMail)
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);








// api.listen(PORT, () => {
//   console.log(`Hello trungquandev.com, I'm running at localhost:${port}/`)
// })

export const handler = serverless(api);
