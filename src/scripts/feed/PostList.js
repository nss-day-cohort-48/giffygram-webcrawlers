import { getFilters, getPosts, getUsers } from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = () => {
    //const likes = getLikes()
    let posts = getPosts()
    const filteredPosts = filterPosts(posts)
    const users = getUsers()
    console.log(filteredPosts)

    if (filteredPosts.length > 0) {
        posts = filteredPosts
    }

    let html = ""
    for (const post of posts) {
        const user = users.find(user =>
            user.id === post.userId)

        html += Post(post, user)
    }
    return html
}

const filterPosts = (postArray) => {
    const filters = getFilters()
    const filteredArray = postArray.filter(
        post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date))
    return filteredArray
}