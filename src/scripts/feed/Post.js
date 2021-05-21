import { getFilters, setUserFilter } from "../data/provider.js"
import { UserProfile } from "../profile/UserProfile.js"
import { PostList } from "./PostList.js"


const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("profile")) {
        const [, userId] = event.target.id.split("--")
        applicationElement.innerHTML = UserProfile(parseInt(userId))
        setUserFilter(parseInt(userId))

        const mainFeed = document.querySelector(".giffygram__feed")
        mainFeed.innerHTML = PostList()

        const filters = getFilters()
        const postCount = document.querySelector("#postCount")
        postCount.innerHTML = filters.postCount
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("favoritePost")) {
        const [, postId] = event.target.id.split("--")
        const targetPost = document.querySelector(`.favoritePost--${postId}`)
        const yellowStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-yellow.svg">`
        const blankStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-blank.svg">`
        if (targetPost.innerHTML === yellowStarHtml) {
            targetPost.innerHTML = blankStarHtml
                // delete favorite object from user
        } else {
            targetPost.innerHTML = yellowStarHtml
                // add favorite object to user
        }
    }
})


export const Post = (post, user) => {
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
            on ${new Date(post.timestamp).toLocaleString("en-US", {month: "numeric", day: "numeric", year: "numeric"})}
        </div>
        <div class="post__actions">
            <div class="favoritePost--${post.id}">
                <img id="favoritePost--${post.id}" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
            <div>
            </div>
        </div>
    </section>
        `
}