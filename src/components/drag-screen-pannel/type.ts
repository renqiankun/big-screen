export type IPannel = {
  scale: number
  width: number
  height: number
  components: IComponent[]
}

export type IComponent = {
  x: number | string
  y: number | string
  w: number | string
  h: number | string
  r: number | string
  z: number | string
  scaleRatio: number
  active: boolean
  preventDeactivation: boolean
}
