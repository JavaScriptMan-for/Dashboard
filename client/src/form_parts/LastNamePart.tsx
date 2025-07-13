import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { LastNameFormTypePart } from '@types-my/form.types';
import last_name_icon from "/img/last_name.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const LastNamePart:FC = () => {

    const { register, formState: { errors } } = useFormContext<LastNameFormTypePart>();

  return (
    <>
    <div className='input-div'>
        <LabelIcon id='last_name_input' alt='last_name_icon' src_img={last_name_icon} />
       <input
        id='last_name_input'
        placeholder='Enter Last Name'
        {...register('last_name', {
          required: "Это поле обязательное",
          minLength: {
            value: 2,
            message: "Фамилия слишком мала"
          },
          maxLength: {
            value: 35,
            message: "Слишком длинная фамилия"
          }
        })}
        type="text" />
    </div>
       <ValidateText isShow={!!errors.last_name}>{errors.last_name?.message}</ValidateText>
    </>
  )
}

export default LastNamePart;