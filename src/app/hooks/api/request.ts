import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type ErrorPayload = {
    message?: string;
    title?: string;
    detail?: string;
    errors?: Record<string, string[]>;
};

type ApiError = AxiosError<ErrorPayload>;

const API_BASE_PATH = process.env.API_BASE_PATH ?? '/api';

const request = axios.create({
    baseURL: API_BASE_PATH,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const accessToken = window.localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers = config.headers || {};
                (config.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error: ApiError) => Promise.reject(error)
);

request.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
            return response;
        }
        return response.data;
    },
    (error: ApiError) => {
        const fallback = error.message ?? 'Request failed';
        const payload = error.response?.data;
        const message = payload?.message || payload?.title || payload?.detail || fallback;
        if (payload?.errors) {
            const details = Object.values(payload.errors).flat().join(' ');
            return Promise.reject(new Error(`${message} ${details}`.trim()));
        }
        return Promise.reject(new Error(message));
    }
);

export default request;
