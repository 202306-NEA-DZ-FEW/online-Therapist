import { apiVersion } from "../env";
export const post = {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            readOnly: ({ document }) => {
                return document?.language !== "en";
            },
            options: {
                source: "title",
                maxLength: 96,
                isUnique: isUniqueOtherThanLanguage,
            },
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: { type: "author" },
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                },
            ],
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        },
        {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
        },
        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },
        {
            name: "language",
            type: "string",
            readOnly: true,
            /* hidden: true, */
        },
    ],

    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
};

export async function isUniqueOtherThanLanguage(slug, context) {
    const { document, getClient } = context;
    if (!document?.language) {
        return true;
    }
    const client = getClient({ apiVersion });
    const id = document._id.replace(/^drafts\./, "");
    const params = {
        draft: `drafts.${id}`,
        published: id,
        language: document.language,
        slug,
    };
    const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
    const result = await client.fetch(query, params);
    return result;
}
