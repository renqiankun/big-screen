import { useGlobalVariableType } from '../../constant'
import type { IGlobalRequest, IRquest, Iparams } from '../../types/request'
import axios from 'axios'
export const httpHand = async (requestData: {
  globalRequest: IGlobalRequest
  request: IRquest
  globalVariable: Record<any, any>
}) => {
  let { globalRequest, request, globalVariable } = requestData
  let url = request.url
  if (!url) return false

  let baseUrl = globalRequest.baseUrl
  let method = request.method
  let timeout = globalRequest.timeout || 30 * 1000

  let globalHeaders: Array<Iparams> = globalRequest.headers || []
  let componentHeaders: Array<Iparams> = request.headers || []
  // 将header 转为map
  let globalHeadersMap = getHeadersMap(globalHeaders, globalVariable)
  let componentHeadersMap = getHeadersMap(componentHeaders, globalVariable)

  let headerContentTypeMap = {
    json: 'application/json;charset=utf-8',
    'x-www-form-urlencoded': 'application/x-www-form-urlencoded;charset=utf-8',
    'form-data': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  let isFormData = request.dataType === 'form-data'
  let paramsMap = getHeadersMap(request.params ?? [], globalVariable)
  let dataMap = getHeadersMap(request.data ?? [], globalVariable, isFormData)

  let dataType = request.dataType // 请求类型
  let httpConfig = {
    baseURL: baseUrl,
    url,
    method,
    timeout,
    params: paramsMap,
    data: dataMap,
    headers: {
      ...globalHeadersMap,
      ...componentHeadersMap,
      'Content-Type': headerContentTypeMap[dataType]
    }
  }
  let response = await axios(httpConfig)
  let code = response?.data?.code??500
  let data = response?.data?.data??[]
  if(code != 200){
    return []
  }
  return data
}

const getHeadersMap = (
  headers: Array<Iparams>,
  globalVarables: Record<any, any>,
  isFormData?: boolean
) => {
  let headersMap: any = isFormData ? new FormData() : {}
  headers?.forEach?.((item: Iparams) => {
    //
    let value = item.value
    // 如果使用全局变量则从全局变量获取，value为全局变量的key
    if (item.type === useGlobalVariableType) {
      value = globalVarables?.[item.value] || ''
      if (!value) {
        console.warn(`${item.value}全局变量不存在`)
      }
    }
    if (isFormData) {
      headersMap.append(item.name, value)
    } else {
      headersMap[item.name] = value
    }
  })
  return headersMap
}
