import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from "sonner"
import { NavigateFunction } from 'react-router-dom'
import { dev_url } from '../../config'

const axiosInstance = axios.create({
  baseURL: dev_url,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean }

let isRefreshing = false
let pendingQueue: {
  resolve: () => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown) => {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve()))
  pendingQueue = []
}

const refreshToken = async () => {
  await axios.post(
    `${dev_url}/user/refresh-token`,
    {},
    { withCredentials: true }
  )
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined
    const status = error.response?.status
    const isRefreshCall = originalRequest?.url?.includes('/user/refresh-token')

    if (status === 401 && originalRequest && !originalRequest._retry && !isRefreshCall) {
      if (isRefreshing) {
        // Wait for the in-flight refresh, then replay this request.
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await refreshToken()
        processQueue(null)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export { axiosInstance }

export async function Post(url: string, data: object, navigate: NavigateFunction) {
  try {
    const response = await axiosInstance.post(url, data)
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (err.response) {
      if (err.response.status < 200 || err.response.status >= 300) {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/sign-in')
          toast.error('Please Login Again')
        } else if (err.response.status === 422) {
          return null
        } else {
         toast.error('Please Try Again')
        }
      }
    } else {
      toast.error('Please Check Your Network')
    }
    return err.response
  }
}

export async function Get(url: string, id: string, navigate: NavigateFunction) {
  try {
    const response = await axiosInstance.get(url + id)
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (err.response) {
      if (err.response.status < 200 || err.response.status >= 300) {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/sign-in')
          toast.error('Please Login Again')
        } else if (err.response.status === 422) {
          return null
        } else {
         toast.error('Please Try Again')
        }
      }
    } else {
      toast.error('Please Check Your Network')
    }
    return err.response
  }
}

export async function GetAll(url: string, navigate: NavigateFunction) {
  try {
    const response = await axiosInstance.get(url)
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (err.response) {
      if (err.response.status < 200 || err.response.status >= 300) {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/sign-in')
          toast.error('Please Login Again')

        } else if (err.response.status === 422) {
          return null
        } else {
         toast.error('Please Try Again')
        }
      }
    } else {
      toast.error('Please Check Your Network')
    }
    return err.response
  }
}

export async function Put(url: string, id: string, data: object, navigate: NavigateFunction) {
  try {
    const response = await axiosInstance.put(url + id, data)
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (err.response) {
      if (err.response.status < 200 || err.response.status >= 300) {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/sign-in')
          toast.error('Please Login Again')
        } else if (err.response.status === 422) {
          return null
        } else {
         toast.error('Please Try Again')
        }
      }
    } else {
      toast.error('Please Check Your Network')
    }
    return err.response
  }
}

export async function Delete(url: string, id: string, navigate: NavigateFunction) {
  try {
    const response = await axiosInstance.delete(url + id)
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (err.response) {
      if (err.response.status < 200 || err.response.status >= 300) {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate('/sign-in')
          toast.error('Please Login Again')
        } else if (err.response.status === 422) {
          return null
        } else {
         toast.error('Please Try Again')
        }
      }
    } else {
      toast.error('Please Check Your Network')
    }
    return err.response
  }
}
