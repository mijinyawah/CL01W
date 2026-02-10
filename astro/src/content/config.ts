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
		date: z.date(),
		category: z.string(),
		type: z.string(),
		authors: z.array(
			z.object({
				name: z.string(),
				role: z.string(),
			})
		),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		slug: keystaticSlug,
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		linkedArticle: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { articles, projects };
