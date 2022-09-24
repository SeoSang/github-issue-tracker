export type ColorInfo = {
  background: string
  text: string
}

type ColorInfoMap = { [key: string]: ColorInfo }

const colorInfoList: ColorInfo[] = [
  {
    background: '#F32424',
    text: '#F2F2F2',
  },
  {
    background: '#F9D923',
    text: '#EB5353',
  },
  {
    background: '#82954B',
    text: '#FFEF82',
  },
  {
    background: '#36AE7C',
    text: '#F9D923',
  },
  {
    background: '#B4FF9F',
    text: '#FFA1A1',
  },
  {
    background: '#FF6363',
    text: '#F7FF93',
  },
  {
    background: '#79DAE8',
    text: '#E8F9FD',
  },
  {
    background: '#F32424',
    text: '#F7FF93',
  },
  {
    background: '#006E7F',
    text: '#FFF56D',
  },
  {
    background: '#9772FB',
    text: '#F2F2F2',
  },
  {
    background: '#F8B400',
    text: '#F32424',
  },
  {
    background: '#F32424',
    text: '#F2F2F2',
  },
  {
    background: '#F2F2F2',
    text: '#F32424',
  },
  {
    background: '#251D3A',
    text: '#F2F2F2',
  },
  {
    background: '#E04D01',
    text: '#251D3A',
  },
  {
    background: '#251D3A',
    text: '#F8CB2E',
  },
  {
    background: '#EE5007',
    text: '#F8CB2E',
  },
  {
    background: '#006E7F',
    text: '#EE5007',
  },
  {
    background: '#7FB5FF',
    text: '#C4DDFF',
  },
  {
    background: '#B4FF9F',
    text: '#FFA1A1',
  },
  {
    background: '#B4FF9F',
    text: '#FFD59E',
  },
  {
    background: '#B4FF9F',
    text: '#F9FFA4',
  },

  {
    background: '#417D7A',
    text: '#FAF5E4',
  },

  {
    background: '#06113C',
    text: '#F9FFA4',
  },

  {
    background: '#E78EA9',
    text: '#1A3C40',
  },

  {
    background: '#E78EA9',
    text: '#417D7A',
  },

  {
    background: '#B9F8D3',
    text: '#E78EA9',
  },
  {
    background: '#40DFEF',
    text: '#B9F8D3',
  },
  {
    background: '#06113C',
    text: '#FF8C32',
  },
  {
    background: '#06113C',
    text: '#EEEEEE',
  },
  {
    background: '#9FB4FF',
    text: '#B9F8D3',
  },
  {
    background: '#06113C',
    text: '#FFF56D',
  },
  {
    background: '#06113C',
    text: '#9FB4FF',
  },
]

export const generateColorMap = (arr: string[]): ColorInfoMap => {
  let colorMap: ColorInfoMap = {}

  arr.forEach((v, i) => {
    colorMap[v] = colorInfoList[i] ?? {
      background: '#9772FB',
      text: '#F2F2F2',
    }
  })
  return colorMap
}

export const isColor = (strColor: string) => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
