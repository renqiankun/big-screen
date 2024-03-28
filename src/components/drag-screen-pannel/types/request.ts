export type IGlobalRequest = {
    baseUrl: string
    timeout?: number
    headers?: any
    interval?: number
    // 请求超时时间 秒
    timeout?: number
}

export type IRquest = {
    method?: string| 'GET'|'POST'|'PUT'|'DELETE'
    url?: string
    params?: any
    data?: any
    // 请求头
    headers: Array<any>
    interval?: number
    // 响应类型
    responseType?: 'json'|'text'|'blob'|'arraybuffer'
    
}