import { author } from "./schemas/author";
import { blockContent } from "./schemas/blockContent";
import { category } from "./schemas/category";
import { comment } from "./schemas/comment";
import { commentReaction } from "./schemas/commentReaction";
import { post } from "./schemas/post";

export const schema = {
    types: [post, author, category, blockContent, comment, commentReaction],
};
