import { getFilters, getLikes, setUserFilter, getUsers, deleteLikes, postLikes, fetchLikes, getView, setView, deletePost } from "../data/provider.js"
import { UserProfile } from "../profile/UserProfile.js"
import { PostList } from "./PostList.js"


const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("profile--")) {
        const [, userId] = event.target.id.split("--")

        setView(true, parseInt(userId))
        setUserFilter(parseInt(userId))

        const mainFeed = document.querySelector(".giffygram__feed")
        mainFeed.innerHTML = PostList()

        const filters = getFilters()
        const postCount = document.querySelector("#postCount")
        postCount.innerHTML = filters.postCount
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("favoritePost")) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const [, postId] = event.target.id.split("--")
        const targetPost = document.querySelector(`.favoritePost--${postId}`)
        const yellowStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-yellow.svg">`
        const blankStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-blank.svg">`

        if (targetPost.innerHTML === yellowStarHtml) {
            targetPost.innerHTML = blankStarHtml
            const likedByUserArray = getLikes().filter(like => like.userId === user)
            const like = likedByUserArray.find(like => like.postId === parseInt(postId))
            deleteLikes(like.id)
                // deletes favorited object from user
        } else {
            targetPost.innerHTML = yellowStarHtml
            const postToAPI = {
                postId: parseInt(postId),
                userId: user
                    // adds favorited object to user
            }
            postLikes(postToAPI)
        }
    }
})



mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("blockPost--")) {
        const user = parseInt(localStorage.getItem("gg_user"))
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
        const targetPost = document.querySelector(`.blockPost--${postId}`)
        const trashHtml = `<img id="blockPost--${postId}" class="actionIcon" src="/images/block.svg">`
    }
})

export const Post = (post, user, star, trash) => {
    return `<section class="post">
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>
        <img class="post__image" src="${post.imageURL}">
        <div class="post__description">${post.description}
        </div>
        <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--${user.id}">
            ${user.name}
            </a>
            on ${new Date(post.timestamp).toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}
        </div>
        <div class="post__actions">
            <div class="favoritePost--${post.id}"><img id="favoritePost--${post.id}" class="actionIcon" ${star}></div>
            <div class="blockPost--${post.id}"><img id="blockPost--${post.id}" class="actionIcon" ${trash}></div>
            </div>
        </div>
    </section>
        `
}