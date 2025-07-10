import { FC } from 'react';
import { LoginFormType } from '@types-my/form.types';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

import username_icon from "/img/login_imgs/email.svg"
import pass_icon from "/img/login_imgs/pass.svg"
import facebook_icon from "/img/login_imgs/facebook.svg"
import google_icon from "/img/login_imgs/google.svg"
import x_icon from "/img/login_imgs/x.svg"

import LabelIcon from '@components/LabelIcon';
import ValidateText from "@components/ValidateText"

const LoginForm: FC = () => {

    const { handleSubmit, formState: {errors, isValid}, register } = useForm<LoginFormType>({mode: 'onBlur'})

    const onSubmit = (data: LoginFormType): void => {

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="sign_in">
                <h1>Sign In</h1>
                <div className='input-div'>
                    <LabelIcon id='username_input' src_img={username_icon} alt='username_icon'/>
                    <input
                    id='username_input'
                    type="text"
                    placeholder='Enter Username'
                    {...register('username', {
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
                    />
                </div>
                <ValidateText isShow={!!errors.username}>{errors.username?.message}</ValidateText>
                <div className="input-div">
                <LabelIcon id='password_input' src_img={pass_icon} alt='password_icon'/>
                    <input
                    id='password_input'
                    type="password"
                    placeholder='Enter Password'
                    {...register('password', {
                        required: "Это поле обязательное",
                        minLength: {
                            value: 6,
                            message: "Слишком короткий пароль"
                        },
                        maxLength: {
                            value: 15,
                            message: "Слишком короткий пароль"
                        }
                    })}
                    />
                </div>
                <ValidateText isShow={!!errors.password}>{errors.password?.message}</ValidateText>
                
                <label className="checkbox-div">
                    <input {...register('isRemember')} type="checkbox" id="is-remember-checkbox" />
                    <label className='checkbox-label' htmlFor="is-remember-checkbox">Remember Me</label>
                </label>
                
            <button disabled={!isValid} type='submit'>Login</button>

                <div id='else'>
                    <div className='various'>
                        <span>Or, Login with</span>
                        <div className="links">
                        <Link to='#'>
                            <img className='input-icon' src={facebook_icon} alt="facebook" />
                        </Link>
                        <Link to='#'>
                            <img className='input-icon' src={google_icon} alt="google" />
                        </Link>
                        <Link to='#'>
                            <img className='input-icon' src={x_icon} alt="x" />
                        </Link>
                        </div>
                    </div>
                    <div className="various">
                        <span>Don’t have an account? <Link to='/register'>Create One</Link></span>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginForm;