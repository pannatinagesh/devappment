import axios, { AxiosError } from 'axios'
import { toast } from "sonner"
import { NavigateFunction } from 'react-router-dom'

export async function Post(url: string, data: object, navigate: NavigateFunction) {
  try {
    const response = await axios.post(url, data)
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
    const response = await axios.get(url + id)
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
    const response = await axios.get(url)
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
    const response = await axios.put(url + id, data)
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
    const response = await axios.delete(url + id)
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
