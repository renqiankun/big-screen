export const hideTooTipHand = (chartInstance: any) => {
  chartInstance?.dispatchAction?.({ type: 'hideTip' })
}

export const destroyHand = (chartInstance: any) => {
  chartInstance?.dispose?.()
  chartInstance = null
}
