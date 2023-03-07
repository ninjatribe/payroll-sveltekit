<script>
	import '../app.css';
  import Nav from '../lib/components/+navBar.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
	/>
</svelte:head>
<main id="content" class="min-h-[100vh] w-screen max-w-screen">
  <Nav/>
	<slot />
</main>
