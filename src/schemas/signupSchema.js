import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    username: yup.string().min(3).max(30).required('Username is required!'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required!'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must match!').required('Confirm password required!')
})