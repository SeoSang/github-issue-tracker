import Popup from './Popup.svelte'

const index = new Popup({
  target: document.body,
  props: {
    name: 'popup',
  },
})

export default index
