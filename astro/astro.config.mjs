// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://cl01w.vercel.app',
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), react(), keystatic()],
	vite: {
		resolve: {
			dedupe: ['react', 'react-dom'],
		},
		optimizeDeps: {
			include: ['@keystatic/core', '@keystatic/core/ui'],
		},
		ssr: {
			noExternal: ['@keystatic/core', '@keystatic/astro'],
		},
		server: {
			fs: {
				allow: [workspaceRoot],
			},
		},
	},
});
