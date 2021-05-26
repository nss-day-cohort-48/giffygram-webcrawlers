import { addPost } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

// listens for when the user clicks on the "have a gif to post?" element in the DOM
applicationElement.addEventListener(
    "click",
    (event) => {
        // minimode is the name of the class of the "have a gif to post?" element in the html
        if (event.target.id === "miniMode") {
            // sets the target element in a variable
            const postEntryELement = document.querySelector(".postEntry")
                // changes the innerHTML to the post entry form
            postEntryELement.innerHTML = PostEntry()
        }
    }
)

// listens for when a user submits a new post
applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "newPost__submit") {
            //creates a new post object from the user input in the form
            const newPost = {
                    title: document.querySelector("#postTitle").value,
                    imageURL: document.querySelector("#postURL").value,
                    description: document.querySelector("#postDescription").value,
                    userId: parseInt(localStorage.getItem("gg_user")),
                    timestamp: Date.now()
                }
                // passes the new post object to the addPost function
                // addPost is a fetch call with the POST method and adds the new post to the API
            addPost(newPost)
        }
    }
)

// this listens for when the user clicks the cancel button in the new post form
applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "newPost__cancel") {
            //refreshes page and brings user back to the feed
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

// returns post entry form html
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

        <button id="newPost__submit">Post</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
}