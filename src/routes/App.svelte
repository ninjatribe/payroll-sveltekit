<!-- Importing Router and Route from svelte-routing to access +page.svelte from login folder -->
<script>
	import { Router, Route } from 'svelte-routing';
	import defaultPage from './+page.svelte';
	import logIn from './login/+page.svelte';
</script>

<div>
	<Router>
		<Route path="/" component={defaultPage} />
		<Route path="/login" component={logIn} />
	</Router>
</div>
