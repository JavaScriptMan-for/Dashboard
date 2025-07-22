import { FC } from 'react';
import VerifyForm from '@components/VerifyForm';
import "@styles/verify.scss"
import { Link, useNavigate } from 'react-router-dom';
import AuthMethods from '@methods/auth.methods';

const VerifyRegisterPage:FC = () => {

  const navigate = useNavigate();

  const onSuccess = (): void => {
    navigate('/dashboard')
  }

  return (
    <div id='verify'>
        <h1>Подтверждение</h1>
        <VerifyForm method={AuthMethods.verify} onSuccess={onSuccess}/>
        <Link className='back' to='/register'>Вернуться назад</Link>
    </div>
  )
}

export default VerifyRegisterPage;