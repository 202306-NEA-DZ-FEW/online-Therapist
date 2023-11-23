export const commentReaction = {
  name: "commentReactions",
  title: "Comment Reactions",
  type: "document",
  fields: [
    {
      name: "commentId",
      title: "Comment Id",
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
        },
      ],
    },
    {
      name: 'post',
      type: 'reference',
      to: [
        {type: 'post'}
      ]
    }
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title'
    },
  },
}