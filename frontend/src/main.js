import App from './App.svelte';

const app = new App({
	target: document.getElementById('frontend'),
	props: {
		name: 'world'
	}
});

export default app;