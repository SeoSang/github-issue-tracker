import Options from './Options.svelte'

const index = new Options({
  target: document.body,
  props: {
    name: 'options',
  },
})

export default index
