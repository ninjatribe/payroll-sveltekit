<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import '../app.css';

	$: {
		if (!$page.data.user) {
			goto('/auth/login');
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
	/>
</svelte:head>
<main id="content" class="min-h-[100vh] w-screen max-w-screen">
	<slot />
</main>
