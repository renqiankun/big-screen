import { ref } from 'vue'
import type { IDatePicker, Ilisteners } from '../types/date-picker'
import type { IComponent } from '../types/type'
import type { IRquest, Iparams } from '../types/request'

export const hideTooTipHand = (chartInstance: any) => {
  chartInstance?.dispatchAction?.({ type: 'hideTip' })
}

export const destroyHand = (chartInstance: any) => {
  chartInstance?.dispose?.()
  chartInstance = null
}

// 处理统一事件修改关联组件
type IUseListener = {
  option: IDatePicker
  components: Array<IComponent>
}
const resetRelComponentParams = (dataCb: IUseListener, listenerCb: Ilisteners) => {
  let data= dataCb
  let listener = listenerCb
  return () => {
    // 关联组件
    let relComponent: IComponent | undefined = data.components.find(
      (item: IComponent) => item.id === listener.relComponentId
    )
    if (!relComponent) return
    let relMap = listener.relMap
    let params: Array<Iparams> = relComponent?.request?.params ?? []
    let body: Array<Iparams> = relComponent?.request?.data ?? []
    params.forEach((item) => {
      let optionKey = relMap[item.name] // 源组件的option中触发改变值key
      if (optionKey) {
        item.value = data.option?.[optionKey as keyof IDatePicker]
      }
    })
    body.forEach((item) => {
      let optionKey = relMap[item.name] // 源组件的option中触发改变值key
      if (optionKey) {
        item.value = data.option?.[optionKey as keyof IDatePicker]
      }
    })
  }
}

// 处理组件监听事件 listeners
export const useListenerHand = (data: IUseListener) => {
  let listenerMap = ref<Record<any, any>>({})
  data.option?.listeners?.forEach?.((item: Ilisteners) => {
    listenerMap.value[item.relEvent] = resetRelComponentParams(data, item)
  })
  return listenerMap
}
