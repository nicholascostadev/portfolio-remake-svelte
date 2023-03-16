<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import '../app.css';

	let ready = false;

	// On page load or when changing themes, best to add inline in `head` to avoid
	let currentTheme: 'dark' | 'light';
	onMount(() => {
		ready = true;
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			currentTheme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			currentTheme = 'light';
		}

		if ('theme' in localStorage) {
			document.documentElement.classList.add(localStorage.theme);
			currentTheme = localStorage.theme;
		} else {
			document.documentElement.classList.add('dark');
			currentTheme = 'dark';
		}
	});

	function toggleTheme() {
		if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		} else {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		}

		currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	}

	const menuData = [
		{
			title: 'Home page',
			links: [
				{
					title: 'Work Experience',
					icon: 'briefcase-variant',
					href: '#work',
					isExternal: false
				},
				{
					title: 'Projects',
					icon: 'view-grid',
					href: '#projects',
					isExternal: false
				}
			]
		},
		{
			title: 'Blog',
			links: [
				{
					title: 'Blog',
					icon: 'format-list-text',
					href: '/blog',
					isExternal: false
				}
			]
		},
		{
			title: 'Social',
			links: [
				{
					title: 'Twitter',
					icon: 'twitter',
					href: 'https://twitter.com/nicholascosta04',
					isExternal: true
				},
				{
					title: 'GitHub',
					icon: 'github',
					href: 'https://github.com/nicholascostadev',
					isExternal: true
				},
				{
					title: 'LinkedIn',
					icon: 'linkedin',
					href: 'https://www.linkedin.com/in/nicholascostadev/',
					isExternal: true
				}
			]
		}
	];

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			toggleTheme();
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<aside
	class="h-screen flex flex-col border-r border-r-slate-100 bg-white p-4 dark:border-r-slate-800 dark:bg-slate-900 w-72 items-start"
>
	<a href="/" class="font-title text-2xl">
		<h1 class="pb-10 text-purple-600 dark:text-purple-100">nicholascostadev</h1>
	</a>
	<nav class="flex w-full flex-col items-start justify-start gap-6">
		{#each menuData as menu}
			<div class="w-full">
				<h2
					class="pointer-events-none mb-1 w-full select-none border-b border-b-slate-200 pb-1 text-center text-slate-600 dark:border-b-slate-600 dark:text-slate-400 xl:text-left"
				>
					{menu.title}
				</h2>
				{#each menu.links as link}
					<a
						href={link.href}
						target={link.isExternal ? '_blank' : undefined}
						class="flex w-auto items-center justify-center gap-2 rounded-md py-2 px-2 text-slate-800  transition-colors dark:text-slate-100  xl:w-full xl:items-center xl:justify-start xl:px-3  hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<Icon icon="mdi:{link.icon}" width={20} height={20} />
						{link.title}
					</a>
				{/each}
			</div>
		{/each}
		{#if ready}
			<div class="w-full">
				<h2
					class="pointer-events-none mb-1 w-full select-none border-b border-b-slate-200 pb-1 text-center text-slate-600 dark:border-b-slate-600 dark:text-slate-400 xl:text-left"
				>
					Tema
				</h2>
				<button
					on:click={toggleTheme}
					class="flex w-auto group items-center justify-center gap-2 rounded-md py-2 px-2 text-slate-800  transition-colors dark:text-slate-100  xl:w-full xl:items-center xl:justify-center xl:px-3  hover:bg-slate-100 dark:hover:bg-slate-800"
				>
					<kbd
						class="text-sm px-2 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 rounded-md transition-colors"
					>
						Ctrl
					</kbd>
					+
					<kbd
						class="text-sm px-2 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 rounded-md transition-colors"
					>
						k
					</kbd>
					or Switch to
					{#if currentTheme === 'dark'}
						<Icon icon="mdi:white-balance-sunny" />
					{:else}
						<Icon icon="mdi:weather-night" />
					{/if}
				</button>
			</div>
		{/if}
	</nav>
</aside>
<main class="bg-white dark:bg-slate-900 w-full min-h-screen">
	<slot />
</main>
