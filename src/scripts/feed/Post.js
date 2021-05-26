import { getFilters, getLikes, setUserFilter, getUsers, deleteLikes, postLikes, fetchLikes, getView, setView, deletePost } from "../data/provider.js"
import { UserProfile } from "../profile/UserProfile.js"
import { PostList } from "./PostList.js"


const applicationElement = document.querySelector(".giffygram")


// listens for user name in posts to be clicked
applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("profile--")) {

        // store the user id in a variable
        const [, userId] = event.target.id.split("--")

        // set the transient state view to look like this:
        // in applicationState(provider.js) : view: {onProfile: false, userId: null}
        // onProfile is set to true and userId is set to the user profile we are trying to be directed to
        setView(true, parseInt(userId))

        // adds a transient state to the filters for filtering by the selected users posts
        setUserFilter(parseInt(userId))

        // get all filters
        const filters = getFilters()
            // setting a variable to an html element in the document
        const postCount = document.querySelector("#postCount")
            // sets the innerHTML to the post count
        postCount.innerHTML = filters.postCount
            // change state
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// listes for when a user clicks on a star in a post
applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("favoritePost")) {
        //gets logged in user
        const user = parseInt(localStorage.getItem("gg_user"))
            //stores the post id in a variable
        const [, postId] = event.target.id.split("--")
            //stores the html element that we are clicking on in a variable
        const targetPost = document.querySelector(`.favoritePost--${postId}`)
            // html that we will insert into the innerHTML of targetPost
        const yellowStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-yellow.svg">`
        const blankStarHtml = `<img id="favoritePost--${postId}" class="actionIcon" src="/images/favorite-star-blank.svg">`

        if (targetPost.innerHTML === yellowStarHtml) {
            // if the innerHTML is equal to yellow, we change it to blank
            targetPost.innerHTML = blankStarHtml
                // get all likes
            const likes = getLikes()
                // filter likes based off of currently logged in user
            const likedByUserArray = likes.filter(like => like.userId === user)
                // find the exact like object that the user is trying to unlike
            const like = likedByUserArray.find(like => like.postId === parseInt(postId))
                // passes the unliked like object into the deleteLikes function
                // deleteLikes is a fetch call with the DELETE method
                // deletes favorited object from user
            deleteLikes(like.id)
        } else {
            // if the star is not yellow, its blank, and then we set it to yellow
            targetPost.innerHTML = yellowStarHtml
                // create a new like object
            const postToAPI = {
                    postId: parseInt(postId),
                    userId: user
                }
                // passes the new like object into the postLikes function
                // postLikes in a fetch call with the POST method and saves it to the API
            postLikes(postToAPI)
        }
    }
})



applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("blockPost--")) {
        //  const user = parseInt(localStorage.getItem("gg_user"))
        const [, postId] = event.target.id.split("--")
        deletePost(parseInt(postId))
            // const targetPost = document.querySelector(`.blockPost--${postId}`)

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