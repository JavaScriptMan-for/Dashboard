import { FC } from 'react';
import "@styles/login.scss"

import back_img from "/img/login_image.png"


import LoginForm from '@components/LoginForm';

const Login:FC = () => {
  return (
    <div id='login-page'>
    <div className='form'>
      <LoginForm />
      <img className='img_form' width={900} src={back_img} alt="login_img" />
    </div>
    </div>
  )
}

export default Login;