import persets from './persets'

const defaultConfig = {
  ...persets.noWobble,
  precision: 0.01
}

export default function spring (val, config) {
  return {
    ...defaultConfig,
    ...config,
    val
  }
}
