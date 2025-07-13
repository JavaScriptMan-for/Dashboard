import { FC } from 'react';
import "@styles/register.scss"

import img_reg from "/img/img_reg.png"

import RegisterForm from '@components/RegisterForm';

const RegisterPage: FC = () => {
  return (
    <div id='register-page'>
       <div className='form'>
          <img id='reg_img' width={433} src={img_reg} alt="img_form" className="img_form" /> 
          <RegisterForm />
       </div>
    </div>
  )
}

export default RegisterPage;