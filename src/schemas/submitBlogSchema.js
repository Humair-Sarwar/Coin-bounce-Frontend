import * as yup from 'yup';

export const submitBlogSchema = yup.object().shape({
    title: yup.string().min(5).max(80).required('Title is required!'),
    content: yup.string().min(5).max(300).required('Content is required')
})