import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RegFormType } from '@types-my/form.types';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@slices-my/store';

import FirstNamePart from '@form-parts/FirstNamePart';
import LastNamePart from '@form-parts/LastNamePart';
import UsernamePart from '@form-parts/UsernamePart';
import EmailPart from '@form-parts/EmailPart';
import PasswordPart from '@form-parts/PasswordPart';
import ConfirmPasswordPart from '@form-parts/ConfirmPasswordPart';
import AcceptTermsPart from '@form-parts/AcceptCheckboxPart';

const RegisterForm:FC = () => {
      const isAccept = useAppSelector((state) => state.form_slice.isAccept);

      const methods = useForm<RegFormType>({ mode: 'onBlur' });
      const { handleSubmit, reset, formState: {isValid}, watch } = methods;

      const onSubmit = (data: RegFormType): void => {
        console.log(data);
      }

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} id='sign_up'>
      <h1>Sign Up</h1>
      <FirstNamePart />
      <LastNamePart />
      <UsernamePart />
      <EmailPart />
      <PasswordPart />
      <ConfirmPasswordPart />
      <AcceptTermsPart />
      <button disabled={!isValid || !isAccept} type='submit'>Register</button>
      <span>Already have an account? <Link to='/login'>Sign In</Link></span>
    </form>
    </FormProvider>
  )
}

export default RegisterForm;