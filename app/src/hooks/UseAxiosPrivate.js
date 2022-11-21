import { axiosPrivate } from '../api'
import { useEffect } from 'react'
import UseRefreshToken from './UseRefreshToken'
import UseAuth from './UseAuth'

const UseAxiosPrivate = () => {
  const refresh = UseRefreshToken()
  const { auth } = UseAuth()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error)
        const prevRequest = error?.config
        //accesToken expired
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true

          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
      },
    )
    return () => {
      axiosPrivate.interceptor.response.eject(responseIntercept)
      axiosPrivate.interceptor.request.eject(requestIntercept)
    }
  }, [auth, refresh])
  return axiosPrivate
}

export default UseAxiosPrivate
