export const comment = {
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        {
            name: "name",
            title: "User Name",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "image",
            title: "User Image",
            type: "string",
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
        },
        {
            name: "childComments",
            title: "Child Comments",
            type: "array",
            of: [{type: "comment"}],
        },
        {
            name: "post",
            type: "reference",
            to: [{type: "post"}],
        },
        {
            name: "approved",
            title: "Approved",
            type: "boolean",
        },
    ],
    preview: {
        select: {
            title: "comment",
            subtitle: "email",
            media: "post.mainImage",
        },
    },
}
