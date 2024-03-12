import keymaster from 'keymaster'
import { onBeforeUnmount } from 'vue'

let controlKey = 17
let copyKey = 'ctrl+c'
let parstKey = 'ctrl+v'
export const unbindKey = ()=>{
    keymaster.unbind(copyKey)
}
export const isControlHand = () => {
  if (keymaster.isPressed(controlKey)) {
    return true
  }
  return false
}

export const copyHandler = (fn: Function) => {
  keymaster(copyKey, (e) => {
    fn?.(e)
  })
}

export const parseHandler = (fn: Function) => {
  keymaster(parstKey, (e) => {
    fn?.(e)
  })
}

export const deleteHand = (fn: Function) => {
   keymaster('backspace', (e) => {
    fn?.(e)
   })
  }