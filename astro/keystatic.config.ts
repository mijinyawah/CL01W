import { config, collection, fields } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';

const mdxComponents = {
	ImageBlock: block({
		label: 'Image Block',
		schema: {
			src: fields.text({ label: 'Image src' }),
			alt: fields.text({ label: 'Alt text' }),
			caption: fields.text({ label: 'Caption', multiline: true }),
		},
	}),
	Callout: wrapper({
		label: 'Callout',
		schema: {
			type: fields.select({
				label: 'Type',
				defaultValue: 'tip',
				options: [
					{ label: 'Tip', value: 'tip' },
					{ label: 'Note', value: 'note' },
					{ label: 'Warning', value: 'warning' },
				],
			}),
		},
	}),
	VideoEmbed: block({
		label: 'Video Embed',
		schema: {
			src: fields.text({ label: 'Video src' }),
			title: fields.text({ label: 'Title' }),
		},
	}),
};

export default config({
	storage: { kind: 'local' },
	ui: {
		brand: { name: 'CL-01W' },
		navigation: {
			Content: ['articles', 'projects'],
		},
	},
	collections: {
		articles: collection({
			label: 'Articles',
			slugField: 'slug',
			path: 'src/content/articles/*',
			format: { contentField: 'content' },
			schema: {
				slug: fields.slug({
					name: { label: 'Title' },
					slug: { label: 'Slug', description: 'Used in the URL (e.g. building-a-website-with-ai)' },
				}),
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				date: fields.date({ label: 'Date' }),
				category: fields.text({ label: 'Category' }),
				type: fields.text({ label: 'Type' }),
				authors: fields.array(
					fields.object({
						name: fields.text({ label: 'Name' }),
						role: fields.text({ label: 'Role' }),
					}),
					{
						label: 'Authors',
						itemLabel: (props) => props.fields.name.value,
					}
				),
				draft: fields.checkbox({ label: 'Draft' }),
				content: fields.mdx({ label: 'Content', components: mdxComponents }),
			},
		}),
		projects: collection({
			label: 'Projects',
			slugField: 'slug',
			path: 'src/content/projects/*',
			format: { contentField: 'content' },
			schema: {
				slug: fields.slug({
					name: { label: 'Title' },
					slug: { label: 'Slug', description: 'Used in the URL' },
				}),
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				description: fields.text({
					label: 'Description',
					multiline: true,
				}),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (props) => props.value,
				}),
				linkedArticle: fields.text({
					label: 'Linked article slug',
					description: 'Optional: match an article slug like "building-a-website-with-ai".',
				}),
				draft: fields.checkbox({ label: 'Draft' }),
				content: fields.mdx({ label: 'Content', components: mdxComponents }),
			},
		}),
	},
});
