import { UserProfile } from "../profile/UserProfile.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("profile")) {
        const [, userId] = event.target.id.split("--")
        applicationElement.innerHTML = UserProfile(parseInt(userId))
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
            <div>
                <img id="favoritePost--4" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
            <div>
            </div>
        </div>
    </section>
        `
}