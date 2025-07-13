import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmailFormTypePart } from '@types-my/form.types';
import email_icon from "/img/email.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const EmailPart: FC = () => {

  const { register, formState: { errors } } = useFormContext<EmailFormTypePart>();

  return (
    <>
      <div className='input-div'>
        <LabelIcon id='email_input' alt='email_icon' src_img={email_icon} />
        <input
          id='email_input'
          placeholder='Enter Email'
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/,
              message: "Некорректный email"
            },
            required: "Это поле обязательное",
            minLength: {
              value: 3,
              message: "Слишком короткий email"
            },
            maxLength: {
              value: 254,
              message: "Слишком длинный email"
            }
          })}
          type="email" />
      </div>
      <ValidateText isShow={!!errors.email}>{errors.email?.message}</ValidateText>
    </>
  )
}

export default EmailPart;