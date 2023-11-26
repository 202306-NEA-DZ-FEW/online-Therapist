export const reaction = {
    name: "reaction",
    title: "Post Reactions",
    type: "document",
    fields: [
        {
            name: "postId",
            title: "Post Id",
            type: "string",
        },
        {
            name: "reactions",
            title: "Reactions",

            type: "array",
            of: [
                {
                    type: "object",

                    fields: [
                        {
                            name: "emoji",
                            type: "string",
                            title: "Emoji",
                        },
                        {
                            name: "counter",
                            type: "number",
                            title: "Counter",
                        },
                        {
                            name: "label",
                            type: "string",
                            title: "Label",
                        },
                    ],

                    preview: {
                        select: {
                            title: "counter",
                            subtitle: "emoji",
                            media: "post.mainImage",
                        },
                        prepare(selection) {
                            const { title, subtitle } = selection;
                            return {
                                title: `Post have ${title}  ${subtitle}`,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: "post",
            type: "reference",
            to: [{ type: "post" }],
        },
    ],
    preview: {
        select: {
            title: "post.title",
            media: "post.mainImage",
        },
    },
};
