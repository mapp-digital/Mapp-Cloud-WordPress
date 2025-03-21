import { mount } from 'svelte'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('mapp_wordpress_config')!,
})

export default app
