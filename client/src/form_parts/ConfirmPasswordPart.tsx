import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from '@slices-my/store';
import { ConfirmPasswordTypePart } from '@types-my/form.types';
import confirm_password_icon from "/img/confirm_password.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const ConfirmPasswordPart:FC = () => {
    const { register, watch, formState: { errors } } = useFormContext<ConfirmPasswordTypePart>();

    const password = useAppSelector((state) => state.form_slice.password_value);
    const confirm_password = watch('confirm_password');
    const [validate, setIsValidate] = useState<boolean>(false)

    useEffect(() => {
       setIsValidate(password === confirm_password)
    }, [password, confirm_password])

  return (
    <>
    <div className='input-div'>
        <LabelIcon id='confirm_password_input' alt='confirm_password_icon' src_img={confirm_password_icon} />
       <input
        id='confirm_password_input'
        placeholder='Confirm Password'
        {...register('confirm_password', {
          required: "Это поле обязательное"
        })}
        type="password" />
    </div>
       <ValidateText isShow={!!errors.confirm_password}>{errors.confirm_password?.message}</ValidateText>
       <ValidateText isShow={!validate && !errors.confirm_password}>Пароли не совпадают</ValidateText>
    </>
  )
}

export default ConfirmPasswordPart;