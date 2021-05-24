import { getFilters, getLikes, getPosts, getUsers, setPostCount } from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = () => {
    const posts = getPosts()
    const filteredPosts = filterPosts(posts)
    const users = getUsers()

    let postCount = 0
    let html = ""
    for (const post of filteredPosts) {
        postCount++
        const user = users.find(user =>
            user.id === post.userId)

        html += Post(post, user)
    }
    setPostCount(postCount)
    return html
}

const filterPosts = (postArray) => {
    const filters = getFilters()
    const posts = postArray

    if (filters.date && filters.userId && filters.favoritesOnly) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        const filteredByAll = userFavoritePosts.filter(
            post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date) && post.userId === filters.userId)
        return filteredByAll
    } else if (filters.date && filters.userId) {
        const filteredByDateAndUser = posts.filter(
            post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date) && post.userId === filters.userId)
        return filteredByDateAndUser
    } else if (filters.date && filters.favoritesOnly) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        const filteredByDateAndFavorites = userFavoritePosts.filter(
            post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date))
        return filteredByDateAndFavorites
    } else if (filters.userId && filters.favoritesOnly) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        const filteredByUserAndFavorites = userFavoritePosts.filter(
            post => post.userId === filters.userId)
        return filteredByUserAndFavorites
    } else if (filters.date) {
        const filteredByDate = posts.filter(
            post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date))
        return filteredByDate
    } else if (filters.userId) {
        const filteredByUser = posts.filter(
            post => post.userId === filters.userId)
        return filteredByUser
    } else if (filters.favoritesOnly) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        return userFavoritePosts
    } else {
        return posts
    }

}