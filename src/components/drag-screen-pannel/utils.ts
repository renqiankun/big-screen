/** 对象浅拷贝，保证origin不会引入额外的key */
export const mergeObjHand = (origin: any, target: any) => {
  for (let key of Object.keys(origin)) {
    origin[key] = target?.[key] ?? origin[key]
  }
}
