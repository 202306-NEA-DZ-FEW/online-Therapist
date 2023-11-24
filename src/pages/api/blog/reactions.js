import {client} from "../../../../sanity/lib/client"

export default async function createComment (req, res) {
  const {_id, reactions} = JSON.parse(req.body)
  reactions.forEach((r) => (r._key = r.label))
  const query = `*[_type == "reaction" && postId == "${_id}"]{_id}[0]`

  try {
    client.fetch(query).then((reaction) => {
      if (reaction) {
        client
          .patch(reaction._id)
          .set({reactions: reactions})
          .commit()
          .then(() => {
            return res.status(200).end()
          })
      } else {
        client
          .create({
            _type: "reaction",
            post: {
              _type: "reference",
              _ref: _id,
            },
            postId: _id,
            reactions: reactions,
          })
          .then(() => {
            return res.status(200).end()
          })
      }
    })

  } catch (err) {
    return res
      .status(500)
      .json({message: `Couldn't submit comment`, err})
  }
  /* return res.status(200).json({message: "Comment submitted"}) */
}
