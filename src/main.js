import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        name: 'todolist'
    }
});

export default app;