import { addPost } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "miniMode") {
            const postEntryELement = document.querySelector(".postEntry")
            postEntryELement.innerHTML = PostEntry()
        }
    }
)

applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "newPost__submit") {
            const newPost = {
                title: document.querySelector("#postTitle").value,
                imageURL: document.querySelector("#postURL").value,
                description: document.querySelector("#postDescription").value,
                userId: parseInt(localStorage.getItem("gg_user")),
                timestamp: Date.now()
            }
            addPost(newPost)
        }
    }
)

export const PostEntry = () => {

    return `
    <div class="newPost">
        <div>
            <input value="" name="postTitle" id="postTitle" class="newPost__input" type="text" placeholder="Title">
        </div>
        <div>
            <input value="" name="postURL" id="postURL" class="newPost__input" type="text" placeholder="URL of gif">
        </div>

        <textarea name="postDescription" id="postDescription" class="newPost__input newPost__description" placeholder="Story behind your gif..."></textarea>

        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
}