// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import keystatic from '@keystatic/astro';

const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url));

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), react(), keystatic()],
	vite: {
		resolve: {
			dedupe: ['react', 'react-dom', '@keystar/ui'],
		},
		server: {
			fs: {
				allow: [workspaceRoot],
			},
		},
	},
});
