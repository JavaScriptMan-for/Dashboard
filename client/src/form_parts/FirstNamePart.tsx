import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FirstNameFormTypePart } from '@types-my/form.types';
import first_name_icon from "/img/first_name.svg";

import LabelIcon from '@components/LabelIcon';
import ValidateText from '@components/ValidateText';

const FirstNamePart:FC = () => {

    const { register, formState: { errors } } = useFormContext<FirstNameFormTypePart>();

  return (
    <>
    <div className='input-div'>
        <LabelIcon id='first_name_input' alt='first_name_icon' src_img={first_name_icon} />
       <input
        id='first_name_input'
        placeholder='Enter First Name'
        {...register('first_name', {
          required: "Это поле обязательное",
          minLength: {
            value: 2,
            message: "Слишком маленькое имя"
          },
          maxLength: {
            value: 35,
            message: "Слишком большое имя"
          }
        })}
         type="text" />
    </div>
       <ValidateText isShow={!!errors.first_name}>{errors.first_name?.message}</ValidateText>
    </>
  )
}

export default FirstNamePart;