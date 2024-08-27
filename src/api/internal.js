import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loginApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/login', data);
    } catch (error) {
        return error;
    }
    return response;
}

export const signupApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/signup', data);
    } catch (error) {
        return error;
    }
    return response;
}

export const getAllBlogApi = async ()=>{
    let response;
    try {
        response = await api.get('/api/all-blog');
    } catch (error) {
        return error;
    }
    return response;
}

export const createBlogApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/blog', data)
    } catch (error) {
        return error;
    }
    return response;
}

export const getBlogDetails = async (id)=>{
    let response;
    try {
        response = await api.get(`/api/get-details-single-blog/${id}`);
    } catch (error) {
        return error;
    }
    return response;
}

export const createNewComment = async (data)=>{
    let response;
    try {
        response = await api.post('/api/comment', data);
    } catch (error) {
        return error;
    }
    return response;
}

export const getCommentsApi = async (id) => {
    let response;
    try {
        response = await api.get(`/api/comment/${id}`);
    } catch (error) {
        return error;
    }
    return response;
}

export const deleteBlogDetails = async (id)=>{
    let response;
    try {
        response = await api.delete(`/api/blog/${id}`);
    } catch (error) {
        return error;
    }
    return response;
}

export const logoutApi = async () => {
    let response;
    try {
        response = await api.post('/api/logout');
    } catch (error) {
        return error;
    }
    return response;
}

export const updateBlogApi = async (data) => {
    let response;
    try {
        response = await api.put('/api/blog', data);
    } catch (error) {
        return error;
    }
    return response;
}

api.interceptors.response.use(
    config => config,
    async (error) =>{
        const originalReq = error.config;
        if((error.response.status === 401 || error.response.status === 500) && originalReq && !originalReq._isRetry){
            originalReq._isRetry = true;
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/api/refresh`,{
                    withCredentials: true
                });
                return api.request(originalReq);
            } catch (error) {
                return error;
            }
        }
    }
)
