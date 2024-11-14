import bodyParser from "body-parser";
import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
api.use(bodyParser.json())
const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);


// const express = require('express')
// const app = express()
// const initRoutes = require('../src/routes/web')

// Cho phép lý dữ liệu từ form method POST
app.use(express.urlencoded({extended: true}))

// Khởi tạo các routes cho ứng dụng
initRoutes(app)


app.listen(port, () => {
  console.log(`Hello trungquandev.com, I'm running at localhost:${port}/`)
})

export const handler = serverless(api);
