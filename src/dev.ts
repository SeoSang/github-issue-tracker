import RecentModal from './pages/components/RecentModal.svelte'

const app = new RecentModal({
  target: document.body,
  props: {
    isDev: true,
  },
})

export default app
