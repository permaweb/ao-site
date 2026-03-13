// Are.na block images (display size, 1200px)
// https://www.are.na/block/43234373, 43118741, 43116980, 43633599
const ARE_NA_IMAGES = {
	grid: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI0MzIzNDM3My9vcmlnaW5hbF83MjMyOTAxNDU4YTlhZTc1MmIzZWVkODI2ZTdiY2Y5Ny5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
	nodes:
		'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI0MzExODc0MS9vcmlnaW5hbF8zNzk0Y2Y5OWY3MWZlOWRiNGQ4ODhjOGJlMjQ1NGIxYy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
	flow: 'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI0MzExNjk4MC9vcmlnaW5hbF9kN2IyNDhkYTUzYjBlMWE3MjhiMTA3MTkwM2E4YmU5MS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
	circuit:
		'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI0MzYzMzU5OS9vcmlnaW5hbF80ZTU5OGE3MjRmZmY2MTZlZmMwMDMzZmRlZDRhYjBiZi5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwiZml0IjoiaW5zaWRlIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfSwid2VicCI6eyJxdWFsaXR5Ijo3NX0sImpwZWciOnsicXVhbGl0eSI6NzV9LCJyb3RhdGUiOm51bGx9fQ==?bc=0',
} as const;

export type BlogPostSection = {
	heading: string;
	paragraphs: string[];
};

export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	publishedAt: string;
	author: string;
	category: string;
	readTime: string;
	imageUrl: string;
	sections: BlogPostSection[];
};

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: 'legacynet-sunset-update',
		title: 'Legacynet Sunset Update.',
		excerpt:
			'The migration to AO mainnet is nearly complete. Forward Research is deploying a whitelist for old processes on legacynet nodes.',
		publishedAt: 'Feb 17, 2026',
		author: 'Forward Research',
		category: 'Update',
		readTime: '1 min read',
		imageUrl: ARE_NA_IMAGES.grid,
		sections: [
			{
				heading: "What's changing.",
				paragraphs: [
					"The migration to AO mainnet is nearly complete, so we're deploying a whitelist for old processes on the @fwdresearch AO legacynet nodes.",
					"Here's what this means:",
					'Any process not on the whitelist will stop receiving traffic from Forward Research nodes.',
					'If you run your own nodes, they continue as before.',
					'All new AOS spawns are already defaulting to AO mainnet.',
					'If your process needs continued support from our nodes through the transition, DM us before Monday, February 23rd.',
					"Legacynet served its purpose well. Now onto what's next.",
				],
			},
		],
	},
	{
		slug: 'ao-hashpaths-and-nixos',
		title: 'AO Hashpaths and NixOS Verifiability.',
		excerpt:
			'A NixOS framing for AO hashpaths: proving lineage across state transitions, not just validating a final output.',
		publishedAt: 'Feb 17, 2026',
		author: 'AO Team',
		category: 'Deep Dive',
		readTime: '2 min read',
		imageUrl: ARE_NA_IMAGES.nodes,
		sections: [
			{
				heading: 'From packages to process state.',
				paragraphs: [
					'This esoteric NixOS mention from the latest AO series is a nice way to think about AO hashpaths.',
					'[placeholder video]',
					"When setting up a new Nix installation, you can determinstically orchestrate the whole stack of packages from 0 and prove that the builds are correct and deps are satisfied. You can fully reconstruct how your OS came into existence, you're not trusting snapshots.",
					"Same with how AO hashpaths prove computation -- instead of packages, it's process state. You're answering how the base state arrived to the latest state a million messages later, with each mutation able to be proven and verified by any node in the network.",
					'Hashpaths prove the lineage of a piece of computation rather than just checking the last output is correct.',
					'Verifiability without painfully slow legacy algorithms.',
				],
			},
		],
	},
	{
		slug: 'building-on-ao',
		title: 'Building on AO with Persistent Data.',
		excerpt: 'A simple walkthrough of how apps can use permanent storage and parallel compute on AO.',
		publishedAt: 'Feb 17, 2026',
		author: 'AO Team',
		category: 'Dev',
		readTime: '2 min read',
		imageUrl: ARE_NA_IMAGES.flow,
		sections: [
			{
				heading: 'Why AO for apps.',
				paragraphs: [
					'AO lets apps compose persistent storage with parallel execution, which makes application state easier to reason about over long time horizons.',
					'For teams shipping quickly, this means data remains available while compute can scale independently as usage changes.',
				],
			},
			{
				heading: 'A practical first milestone.',
				paragraphs: [
					'A useful first step is to publish immutable release notes and docs as permanent content, then attach app metadata for fast reads.',
					'From there, you can incrementally move workflows to AO processes without rewriting everything at once.',
				],
			},
		],
	},
	{
		slug: 'ship-faster-with-permaweb',
		title: 'Ship Faster with Permaweb-Native Workflows.',
		excerpt: 'How to structure product releases so content, code references, and updates stay consistent over time.',
		publishedAt: 'Feb 14, 2026',
		author: 'AO Team',
		category: 'Dev',
		readTime: '2 min read',
		imageUrl: ARE_NA_IMAGES.circuit,
		sections: [
			{
				heading: 'Treat content like product.',
				paragraphs: [
					'Product pages, release notes, and docs should be versioned and discoverable in one predictable structure.',
					'A permaweb-first approach makes historical context part of the product experience instead of a separate archive.',
				],
			},
			{
				heading: 'Iterate without losing context.',
				paragraphs: [
					'Teams can publish small improvements on a regular cadence while keeping every prior state accessible.',
					'That makes debugging and communication easier, especially when users report behavior from older builds.',
				],
			},
		],
	},
];

export function getBlogPostBySlug(slug?: string) {
	if (!slug) return null;
	return BLOG_POSTS.find((post: BlogPost) => post.slug === slug) ?? null;
}
