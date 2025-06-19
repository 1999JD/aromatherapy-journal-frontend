// utils/axiosInstance.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const request = axios.create({
    baseURL: process.env.API_BASE_PATH,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {        
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

// 響應攔截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 檢查配置的響應類型是否為二進位制類型（'blob' 或 'arraybuffer'）, 如果是，直接返迴響應對象
        // if (
        //   response.config.responseType === 'blob' ||
        //   response.config.responseType === 'arraybuffer'
        // ) {
        //   return response
        // }

        // const { code, result, message } = response.data
        // const codeState = code.toString().substr(0, 3) // 狀態前三碼

        // if (codeState === ResultEnum.SUCCESS) {
        //   return result
        // }

        // ElMessage.error(message || '系統錯誤')
        // return Promise.reject(new Error(message || 'Error'))
        return response.data
    },
    (error: any) => {
        // 異常處理
        console.error(error) // for debug
        // if (error && error.response) {
        //   const { code, message } = error.response.data
        //   if (code === ResultEnum.TOKEN_INVALID) {
        //     ElNotification({
        //       title: '提示',
        //       message: '登入階段已過期，請重新登入',
        //       type: 'info',
        //     })
        //     useUserStoreHook()
        //       .resetToken()
        //       .then(() => {
        //         location.reload()
        //       })
        //   } else {
        //     ElMessage.error(message || '系統錯誤')
        //   }
        // }
        return Promise.reject(error.message)
    }
)

export default request;
