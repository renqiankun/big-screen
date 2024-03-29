export  type Iparams = {
    name: string
    value: string
    type: string
}

export type IGlobalRequest = {
  baseUrl: string
  timeout?: number
  headers?: Array<Iparams>
  interval?: number
  // 请求超时时间 秒
}

export type IRquest = {
  url?: string
  method?: string | 'GET' | 'POST' | 'PUT' | 'DELETE'
  dataType: 'form-data' | 'json' | 'x-www-form-urlencoded'
  // 请求头
  headers: Array<Iparams>
  params: Array<Iparams>
  data: Array<Iparams>

  interval?: number
}
