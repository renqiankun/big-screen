/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : ('r&0x3' as any | '0x8')).toString(16)
  })
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style: any) {
  style = { ...style }
  if (style.rotate) {
    const newWidth = style.width * Math.cos(style.rotate) + style.height * Math.sin(style.rotate)
    const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
    style.left += diffX
    style.right = style.left + newWidth

    const newHeight = style.height * Math.cos(style.rotate) + style.width * Math.sin(style.rotate)
    const diffY = (newHeight - style.height) / 2 // 始终是正
    style.top -= diffY
    style.bottom = style.top + newHeight

    style.width = newWidth
    style.height = newHeight
  } else {
    style.bottom = style.top + style.height
    style.right = style.left + style.width
  }

  return style
}
