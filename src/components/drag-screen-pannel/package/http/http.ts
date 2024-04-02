import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useGlobalVariableType } from '../../constant'
import type { IGlobalRequest, IRquest, Iparams } from '../../types/request'
import axios from 'axios'
import type { Ref } from 'vue'
type RequestData = {
  globalRequest: IGlobalRequest
  request: IRquest
  globalVariable: Record<any, any>
}
const httpHand = async (requestData: RequestData) => {
  return new Promise(async (resolve, reject) => {
    let { globalRequest, request, globalVariable } = requestData
    let url = request?.url ?? ''
    if (!hasRquestData(url)) return resolve(false)

    let baseUrl = globalRequest?.baseUrl
    let method = request?.method
    let timeout = globalRequest?.timeout || 30 * 1000

    let globalHeaders: Array<Iparams> = globalRequest?.headers || []
    let componentHeaders: Array<Iparams> = request?.headers || []
    // 将header 转为map
    let globalHeadersMap = getHeadersMap(globalHeaders, globalVariable)
    let componentHeadersMap = getHeadersMap(componentHeaders, globalVariable)

    let headerContentTypeMap = {
      json: 'application/json;charset=utf-8',
      'x-www-form-urlencoded': 'application/x-www-form-urlencoded;charset=utf-8',
      'form-data': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    let isFormData = request.dataType === 'form-data'
    let paramsMap = getHeadersMap(request?.params ?? [], globalVariable)
    let dataMap = getHeadersMap(request?.data ?? [], globalVariable, isFormData)

    let dataType = request.dataType // 请求类型
    let httpConfig = {
      baseURL: baseUrl,
      url,
      method,
      timeout,
      params: paramsMap,
      data: dataMap,
      headers: {
        'Content-Type': headerContentTypeMap[dataType],
        ...globalHeadersMap,
        ...componentHeadersMap
      }
    }
    axios(httpConfig).then((response) => {
      let code = response?.data?.code ?? 500
      let data = response?.data?.data ?? []
      if (code != 200) {
        return resolve(false)
      }
      resolve(data)
    }).catch((error) => {
        resolve(false)
    })
  })
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
const hasRquestData = (url: string) => {
  return !!url
}


/**
 * 
 * @param requestData globalRequest, request, globalVariable
 * @param fn 回调函数
 * @returns Ref<data | false>
 */
export const useHttpHand = (requestData: Ref<RequestData>, fn?: Function) => {
  let data = ref()
  onMounted(async () => {
    lithenRequestParams()
  })
  let unwatchParams: any = null
  const lithenRequestParams = () => {
    unwatchParams = watch(
      () => [requestData.value.globalRequest, requestData.value.request],
      async () => {
        data.value = await httpHand(requestData.value)
        if (hasRquestData(requestData.value.request.url as string)) {
          fn?.(data.value)
        }
      },
      {
        deep: true,
        immediate: true,
        flush: 'post'
      }
    )
  }
  onBeforeUnmount(() => {
    unwatchParams?.()
  })
  return data
}
