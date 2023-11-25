import { author } from "./schemas/author";
import { blockContent } from "./schemas/blockContent";
import { category } from "./schemas/category";
import { post } from "./schemas/post";

export const schema = {
    types: [post, author, category, blockContent],
};
