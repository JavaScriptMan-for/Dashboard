
import { createTransport } from "nodemailer"


const my_email = process.env.MY_EMAIL
const pass = process.env.PASS;

if (!my_email || !pass) {
  throw new Error("Нужно задать в .env MY_EMAIL и PASS");
}


const transporter = createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: my_email,
    pass: pass,
  },
});
export default transporter