import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RegFormType } from '@types-my/form.types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@slices-my/store';

import { useMutation } from '@tanstack/react-query';
import AuthMethods from '@methods/auth.methods';

import ValidateText from '@components/ValidateText';
import Loading from '@components/Loading';

import FirstNamePart from '@form-parts/FirstNamePart';
import LastNamePart from '@form-parts/LastNamePart';
import UsernamePart from '@form-parts/UsernamePart';
import EmailPart from '@form-parts/EmailPart';
import PasswordPart from '@form-parts/PasswordPart';
import ConfirmPasswordPart from '@form-parts/ConfirmPasswordPart';
import AcceptTermsPart from '@form-parts/AcceptCheckboxPart';

const RegisterForm:FC = () => {
      const isAccept = useAppSelector((state) => state.form_slice.isAccept);
      const navigate = useNavigate();

      const [formData, setFormData] = useState<RegFormType | null>(null)

      const methods = useForm<RegFormType>({ mode: 'onBlur' });
      const { handleSubmit, formState: { isValid } } = methods;

      const onSubmit = (data: RegFormType): void => {
        console.log(data);
        setFormData(data)
        mutation.mutate(data)
      }

      const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: AuthMethods.register,
        onSuccess: () => {
          // if(formData) {
          //   sessionStorage.setItem('email', formData.email);
          //   sessionStorage.setItem('action', )
          // }
          navigate('/verify')
        }
      })

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
      <Loading isShow={!mutation.isError && mutation.isPending}/>
      <ValidateText isShow={!mutation.isPending && !!mutation.error}>{mutation.error?.message}</ValidateText>
    </form>
    </FormProvider>
  )
}

export default RegisterForm;