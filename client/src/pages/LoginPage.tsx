import { FC } from 'react';
import "@styles/login.scss"

import back_img from "/img/login_imgs/login_image.png"


import LoginForm from '@components/LoginForm';

const Login:FC = () => {
  return (
    <>
    <div id='login'>
      <LoginForm />
      <img id='img_login' width={900} src={back_img} alt="login_img" />
    </div>
    </>
  )
}

export default Login;