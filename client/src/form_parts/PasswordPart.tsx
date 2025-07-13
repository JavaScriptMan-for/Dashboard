import { FC, useEffect } from 'react';
import { setPasswordValue } from '@slices-my/form';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from '@slices-my/store';
import { PasswordFormTypePart } from '@types-my/form.types';
import password_icon from "/img/pass.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const PasswordPart:FC = () => {
    const dispatch = useAppDispatch();
    const { register, watch, formState: { errors } } = useFormContext<PasswordFormTypePart>();
    const password_watch = watch('password');

    useEffect(() => {
      console.log(password_watch);
      
      dispatch(setPasswordValue(password_watch))
    }, [password_watch, dispatch])

  return (
    <>
    <div className='input-div'>
        <LabelIcon id='password_input' alt='password_icon' src_img={password_icon} />
       <input
      id='password_input'
      placeholder='Enter Password'
      {...register('password', {
            required: "Пароль обязателен для заполнения",
            minLength: {
              value: 8,
              message: "Пароль должен содержать не менее 8 символов"
            },
            pattern: {
              value: /^(?=.*[A-Z]).{6,}$/,
              message: "Слишком простой пароль"
            }
          })}
      type="password"
       />
    </div>
       <ValidateText isShow={!!errors.password}>{errors.password?.message}</ValidateText>
    </>
  )
}

export default PasswordPart;