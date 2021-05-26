import { getFilters, getLikes, getPosts, getProfiles, getUsers, setPostCount } from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = () => {

    // gets the logged in user
    const user = parseInt(localStorage.getItem("gg_user"))
        // gets all the posts
    const posts = getPosts()
        // filters all the posts based off of user filter selection
    const filteredPosts = filterPosts(posts)
        // get all users
    const users = getUsers()
        // sets the src image for the blank star and yellow star
    const blankStar = `src="/images/favorite-star-blank.svg"`
    const yellowStar = `src="/images/favorite-star-yellow.svg"`

    // gets all likes
    const likes = getLikes()
        //filters liked based off of the logged in user
    const likedByUserArray = likes.filter(like => like.userId === user)
        // sets post count to 0 (this is just to display the amount of posts on the feed in the DOM)
    let postCount = 0

    let html = ""
    for (const post of filteredPosts) {
        // add one to post count
        postCount++
        // finding the user of the current post in the iteration
        const user = users.find(user =>
                user.id === post.userId)
            // set trash var to empty string
        let trash = ""
            // get logged in user
        const loggedInUser = parseInt(localStorage.getItem("gg_user"))
            // if the current post.userId in the iteration matches the logged in user id,
            // then we set the trash icon to the relevant image. otherwise it stays blank and does not display in the DOM
        if (post.userId === loggedInUser) {
            trash = `src="/images/block.svg"`
        }
        // set star img variable to blank star as default
        let star = blankStar
            //  iterated through the likes that was filtered early by user selection
        for (const like of likedByUserArray) {
            // determines whether the current post in the iteration matches any of the like.postIds in the likedByUserArray
            if (like.postId === post.id) {
                // if we find a match, we set the star to yellow
                star = yellowStar
            }
        }
        // adds a string of each post to the html
        // post is an object of the post
        // user is an object of the user
        // star is just the html string of the star image
        // trash is just the html string  of the trash image
        html += Post(post, user, star, trash)
    }
    // sets post count in the transient state database
    setPostCount(postCount)
        // returns the entire html of all the posts
    return html
}

const filterPosts = (postArray) => {
    // gets a list of all the filters the user has selected
    const filters = getFilters()
        // storing the postArray in a variable
    const posts = postArray
        // check if the user selected all the filters
    if (filters.date && filters.userId && filters.favoritesOnly) {
        // get logged in user
        const user = parseInt(localStorage.getItem("gg_user"))
            // get all likes
        const likes = getLikes()
            // filter the likes and get only the likes from the current user
        const userLikes = likes.filter(like => user === like.userId)
            // sets an empty array for the users favorite posts
        const userFavoritePosts = []
            // iterate through every like for the user and matches it with the post that they liked
        for (const like of userLikes) {
            userFavoritePosts.push(
                posts.find(
                    post => post.id === like.postId)
            )
        }
        // filters the array of favorited posts by date and user
        // the list being passed in (userFavoritePosts) has already been filtered by favorites/liked posts
        const filteredByAll = userFavoritePosts.filter(
                post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date) && post.userId === filters.userId)
            // returns the array
        return filteredByAll
    } else if (filters.date && filters.userId) {
        //filters by date and user
        const filteredByDateAndUser = posts.filter(
                post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date) && post.userId === filters.userId)
            //returns filtered lists
        return filteredByDateAndUser
    } else if (filters.date && filters.favoritesOnly) {
        // same as the first condition. filter by favorites
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        // takes the array that was filtered by favorites and filters it by date as well
        const filteredByDateAndFavorites = userFavoritePosts.filter(
                post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date))
            // returns filtered array
        return filteredByDateAndFavorites
    } else if (filters.userId && filters.favoritesOnly) {
        // filters by user and favorites
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        const filteredByUserAndFavorites = userFavoritePosts.filter(
                post => post.userId === filters.userId)
            // returns filtered array
        return filteredByUserAndFavorites
    } else if (filters.date) {
        //returns filtered by date
        const filteredByDate = posts.filter(
            post => parseInt(new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }).slice(-4)) >= parseInt(filters.date))
        return filteredByDate
    } else if (filters.userId) {
        // returns filtered by user
        const filteredByUser = posts.filter(
            post => post.userId === filters.userId)
        return filteredByUser
    } else if (filters.favoritesOnly) {
        // returns filtered by favorites
        const user = parseInt(localStorage.getItem("gg_user"))
        const likes = getLikes()
        const userLikes = likes.filter(like => user === like.userId)
        const userFavoritePosts = []
        for (const like of userLikes) {
            userFavoritePosts.push(posts.find(post => post.id === like.postId))
        }
        return userFavoritePosts
    } else {
        // this return only runs if none of the filters are selected
        // it is just the original array of posts from the beginning of the function
        return posts
    }

}