import { blogActions } from "./blog-slice";
import { uiActions } from "./ui-slice";


export const getAllBlog = () => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading());
        const response = await fetch('/api/blog');

        const data = await response.json();
        dispatch(blogActions.getAllBlogPosts({
            items: data.items
        }));
        dispatch(uiActions.showLoading());
    }
}