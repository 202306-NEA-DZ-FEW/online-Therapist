import {author} from "./schemas/author"
import {blockContent} from "./schemas/blockContent"
import {category} from "./schemas/category"
import {comment} from "./schemas/comment"
import {post} from "./schemas/post"
import {reaction} from "./schemas/reaction"

export const schema = {
    types: [post, author, category, blockContent, comment, reaction],
}
