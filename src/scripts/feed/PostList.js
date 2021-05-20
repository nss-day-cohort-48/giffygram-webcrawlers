import { getPosts } from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = () => {

    //const likes = getLikes()
    const posts = getPosts()
 
    //const users = getUsers()
    let html = ""
    for (const post of posts) {
        html += Post(post)
    }
    return html
}