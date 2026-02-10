import { config, collection, fields } from '@keystatic/core';
import { block, mark, wrapper } from '@keystatic/core/content-components';
import { injectGlobal } from '@keystar/ui/style';
import { createElement } from 'react';

injectGlobal`
  :where([data-keystatic-editor="content"], [data-keystatic-editor="content"] .ProseMirror) {
    color: #f8f8f8;
  }
  :where([data-keystatic-editor="content"]) :is(
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li,
    blockquote,
    pre,
    code,
    strong,
    em
  ) {
    color: #f8f8f8;
  }
  :where([data-keystatic-editor="content"]) :is(h1, h2, h3, h4, h5, h6) {
    color: #f8f8f8 !important;
  }
  :where([data-keystatic-editor="content"]) a {
    color: #ec8cff;
  }
`;

const textColorOptions = {
	accent: { label: 'Accent', value: 'accent', color: '#ec8cff' },
	muted: { label: 'Muted', value: 'muted', color: '#cfd6dc' },
	warning: { label: 'Warning', value: 'warning', color: '#f5a623' },
	blue: { label: 'Blue', value: 'blue', color: '#8f62ff' },
	teal: { label: 'Teal', value: 'teal', color: '#4af6ff' },
};

const mdxComponents = {
	TextColor: mark({
		label: 'Text Color',
		icon: createElement(
			'span',
			{
				style: {
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '18px',
					height: '18px',
					border: '1px solid #cfd6dc',
					borderRadius: '4px',
					fontWeight: 700,
					fontSize: '11px',
					lineHeight: 1,
				},
			},
			'A'
		),
		schema: {
			color: fields.select({
				label: 'Color',
				defaultValue: textColorOptions.accent.value,
				options: Object.values(textColorOptions),
			}),
		},
		style: ({ value }) => ({
			color: textColorOptions[value.color]?.color ?? textColorOptions.accent.color,
		}),
	}),
	ImageBlock: block({
		label: 'Image Block',
		schema: {
			src: fields.image({
				label: 'Image',
				directory: 'public/keystatic',
				publicPath: '/keystatic/',
				validation: { isRequired: true },
			}),
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
	storage: {
		kind: 'github',
		repo: 'mijinyawah/CL01W',
		pathPrefix: 'astro',
	},
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
				summary: fields.text({
					label: 'Summary',
					description: 'Shown in SEO and previews. Aim for 1–2 sentences.',
					multiline: true,
					validation: { isRequired: true },
				}),
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
