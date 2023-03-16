<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BlogIcon from 'svelte-icons-pack/vsc/VscPreview';
	import WorkIcon from 'svelte-icons-pack/vsc/VscBriefcase';
	import SunIcon from 'svelte-icons-pack/bs/BsSun';
	import MoonIcon from 'svelte-icons-pack/bs/BsMoon';
	import ProjectsIcon from 'svelte-icons-pack/bs/BsGridFill';
	import TwitterIcon from 'svelte-icons-pack/vsc/VscTwitter';
	import LinkedInIcon from 'svelte-icons-pack/bs/BsLinkedin';
	import GithubIcon from 'svelte-icons-pack/vsc/VscGithubInverted';

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
					icon: WorkIcon,
					href: '#work',
					isExternal: false
				},
				{
					title: 'Projects',
					icon: ProjectsIcon,
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
					icon: BlogIcon,
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
					icon: TwitterIcon,
					href: 'https://twitter.com/nicholascosta04',
					isExternal: true
				},
				{
					title: 'GitHub',
					icon: GithubIcon,
					href: 'https://github.com/nicholascostadev',
					isExternal: true
				},
				{
					title: 'LinkedIn',
					icon: LinkedInIcon,
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
					class="pointer-events-none mb-1 w-full select-none border-b border-b-slate-200 pb-1 text-slate-600 dark:border-b-slate-600 dark:text-slate-400 xl:text-left"
				>
					{menu.title}
				</h2>
				{#each menu.links as link}
					<a
						href={link.href}
						target={link.isExternal ? '_blank' : undefined}
						class="flex w-auto items-center justify-start gap-2 rounded-md py-2 px-2 text-slate-800  transition-colors dark:text-slate-100  xl:w-full xl:items-center xl:justify-start xl:px-3  hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<Icon src={link.icon} size="16" />
						{link.title}
					</a>
				{/each}
			</div>
		{/each}
		{#if ready}
			<div class="w-full">
				<h2
					class="pointer-events-none mb-1 w-full select-none border-b border-b-slate-200 pb-1 text-slate-600 dark:border-b-slate-600 dark:text-slate-400 xl:text-left"
				>
					Tema
				</h2>
				<button
					on:click={toggleTheme}
					class="text-sm flex group items-center w-full justify-center gap-2 rounded-md py-2 px-2 text-slate-800  transition-colors dark:text-slate-100  xl:w-full xl:items-center xl:justify-center xl:px-3  hover:bg-slate-100 dark:hover:bg-slate-800"
				>
					<kbd
						class="px-2 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 rounded-md transition-colors"
					>
						Ctrl
					</kbd>
					+
					<kbd
						class="px-2 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 rounded-md transition-colors"
					>
						k
					</kbd>
					{#if currentTheme === 'dark'}
						<Icon src={SunIcon} size="16" />
					{:else}
						<Icon src={MoonIcon} size="16" />
					{/if}
				</button>
			</div>
		{/if}
	</nav>
</aside>
<main class="bg-white dark:bg-slate-900 w-full min-h-screen">
	<slot />
</main>
