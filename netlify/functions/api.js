import bodyParser from "body-parser";
import express, { Router } from "express";
import serverless from "serverless-http";
import nodeMailer from "nodemailer";
import cors from "cors";
// const express = require('express')
// const app = express()
// const initRoutes = require('../../src/routes/web')
// Khởi tạo các routes cho ứng dụng
// initRoutes(app)
const PORT = 3001;
const router = Router();
const api = express();
api.use(bodyParser.json())

api.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
api.use(cors({
  origin: '*', // Replace with your domain or use '*' for all origins
}));
// Cho phép lý dữ liệu từ form method POST
api.use(express.urlencoded({extended: true}))



// Những thông tin dưới đây các bạn có thể ném nó vào biến môi trường env nhé.
// Vì để demo nên mình để các biến const ở đây.
// const adminEmail = 'basir.iplex@gmail.com'
// const adminPassword = 'oexy pywc ceyq vide'

const adminEmail = 'info@tech2initiative.org'
const adminPassword = 'hcmn oybh qcll tlbf'


// Mình sử dụng host của google - gmail
const mailHost = 'smtp.gmail.com'
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587

const sendMail = (from, subject, htmlContent) => {
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })

  // const options = {
  //   from: adminEmail, // địa chỉ admin email bạn dùng để gửi
  //   to: to, // địa chỉ gửi đến
  //   subject: subject, // Tiêu đề của mail
  //   html: htmlContent // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  // }

  const options = {
    from, // địa chỉ admin email bạn dùng để gửi
    to: adminEmail, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail
    html: htmlContent // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  }

  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options)
}
router.post('/send-email', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://tech2initiative.org');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
      // Lấy data truyền lên từ form phía client
      const { from, subject, body } = req.body
  
      // Thực hiện gửi email
      await sendMail(from, subject, body)
  
     
      res.send('<h3>Your email has been sent successfully.</h3>')
    } catch (error) {
     
      console.log(error)
      res.send(error)
    }
})
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);








// api.listen(PORT, () => {
//   console.log(`Hello trungquandev.com, I'm running at localhost:${PORT}/`)
// })

export const handler = serverless(api);
