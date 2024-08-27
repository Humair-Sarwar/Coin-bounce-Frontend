
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().min(3).max(30).required('Username is required!'),
    password: yup.string().required('Password is required!')
})