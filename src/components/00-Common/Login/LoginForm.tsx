import React from 'react';
import {useFormik} from 'formik';
import {CheckboxFormik, InputFormik} from "../InputFormik/InputFormik";
import css from "./LoginForm.module.scss"
import {AuthButton} from "../AuthButton/AuthButton";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

type LoginFormType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any, setSubmitting: any) => void
    captchaUrl: string | null
}

export const LoginForm: React.FC<LoginFormType> = ({loginTC, captchaUrl}) => {
    console.log("RERENDER")
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'invalid email address';
            }
            if (!values.password) {
                errors.password = 'required'
            } else if (values.password.trim().length < 5) {
                errors.password = "min 5 symbols"
            }
            return errors;
        },
        onSubmit: (values, onSubmitProps) => {
            loginTC(values.email, values.password, values.rememberMe, values.captcha, onSubmitProps.setStatus, onSubmitProps.setSubmitting)
            onSubmitProps.setSubmitting(true);
            // alert(JSON.stringify(values));
        },
    });
    return (

        <form className={css.loginForm} onSubmit={formik.handleSubmit}>
            <InputFormik placeholder={"email"} getFieldProps={formik.getFieldProps("email")}
                         errors={formik.errors.email} type={"text"}/>
            <InputFormik placeholder={"password"} getFieldProps={formik.getFieldProps("password")}
                         errors={formik.errors.password} type={"password"}/>

            <CheckboxFormik label={"Remember Me"} getFieldProps={formik.getFieldProps("rememberMe")}/>

            <div className={css.fields}>
                {formik.status}
                {captchaUrl &&
                    <div className={css.fields}>
                        <img src={captchaUrl} alt="captchaUrl"/>
                        <label htmlFor="captcha">Captcha</label>
                        <input id="captcha" type="text"
                               {...formik.getFieldProps("captcha")}
                        />
                        {formik.errors.captcha ? <div>{formik.errors.captcha}</div> : null}</div>
                }
            </div>
            <div className={css.buttonBlock}>
                <AuthButton type="submit">Login</AuthButton>
                <div className={css.forgot}>
                    <div>Register</div>
                    <div>Forgot Password</div>
                </div>
            </div>
        </form>
    );
};