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

export const collections = { articles, projects };
