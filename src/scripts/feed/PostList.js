import { getPosts, getUsers } from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = () => {
    //const likes = getLikes()
    const posts = getPosts()
    const users = getUsers()

    let html = ""
    for (const post of posts) {
        const user = users.find(user =>
            user.id === post.userId)

        html += Post(post, user)
    }
    return html
}