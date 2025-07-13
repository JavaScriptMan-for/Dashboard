import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { UsernameFormTypePart } from '@types-my/form.types';
import username_icon from "/img/username.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const UsernamePart:FC = () => {

    const { register, formState: { errors } } = useFormContext<UsernameFormTypePart>();

  return (
    <>
    <div className='input-div'>
       <LabelIcon id='username_input' alt='username_icon' src_img={username_icon} />
       <input
        id='username_input'
        placeholder='Enter Username'
        {...register('username', {
          required: "Это поле обязательное",
          minLength: {
            value: 3,
            message: "Слишком короткий username" 
          },
          maxLength: {
            value: 30,
            message: "Слишком длинный username"
          }
        })}
        type="text" />
    </div>
       <ValidateText isShow={!!errors.username}>{errors.username?.message}</ValidateText>
    </>
  )
}

export default UsernamePart;