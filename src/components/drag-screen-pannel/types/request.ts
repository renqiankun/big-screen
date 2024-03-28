export  type Iparams = {
    name: string
    value: string
    type: string
}

export type IGlobalRequest = {
  baseUrl: string
  timeout?: number
  headers?: any
  interval?: number
  // 请求超时时间 秒
}

export type IRquest = {
  url?: string
  method?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'
  // 请求头
  headers: Array<Iparams>
  params: Array<Iparams>
  data: Array<Iparams>

  interval?: number
  // 响应类型
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'
}
