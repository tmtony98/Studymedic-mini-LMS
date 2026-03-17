import apiClient from './apiClient';

const BASEURL = "http://localhost:5000/";

export const LoginApi = async (data) => {
    try {
        const response = await apiClient(`${BASEURL}login` , { data });
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export const RegisterApi = async (data) => {
    try {
        const response = await apiClient(`${BASEURL}register` , { data });
        return response.data;
    } catch (error) {
        console.error('Register API Error:', error);
        throw error;
    }
}

