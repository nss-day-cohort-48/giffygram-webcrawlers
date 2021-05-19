import { getPosts } from '../data/provider.js'

export const Post = () => {
    
    const posts = getPosts()

    let html = "<h2>postList</h2>"

    for (const postId of postList) {
        const post = posts.find(post => post.id === postId)

        html += `<section class="post">
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>
        <img class="post__image" ${post.imageURL}>
        <div class="post__description">${post.description}
        </div>
        <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--2">
            ${post.userId}
            </a>
            on ${post.userId}
        </div>
        <div class="post__actions">
            <div>
                <img id="favoritePost--4" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
            <div>
                

            </div>
        </div>
    </section>`
    }

    return html
}