import { defineCollection, z } from 'astro:content';

const keystaticSlug = z
	.object({
		name: z.string(),
		slug: z.string(),
	})
	.optional();

const articles = defineCollection({
	type: 'content',
	schema: z.object({
		slug: keystaticSlug,
		title: z.string(),
		summary: z.string(),
		date: z.date().optional(),
		category: z.string().optional(),
		type: z.string().optional(),
		authors: z
			.array(
				z.object({
					name: z.string(),
					role: z.string(),
				})
			)
			.default([]),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		slug: keystaticSlug,
		title: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
		linkedArticle: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const chirps = defineCollection({
	type: 'data',
	schema: z.object({
		slug: z.string().optional(),
		date: z.string(),
		content: z.string().max(140),
		tags: z.array(z.string()).default([]),
		link: z.union([z.string().url(), z.literal('')]).optional(),
		image: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { articles, projects, chirps };
