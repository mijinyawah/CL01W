// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url));

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), react(), keystatic()],
	vite: {
		server: {
			fs: {
				allow: [workspaceRoot],
			},
		},
	},
});
