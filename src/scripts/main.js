import { LoginForm } from "./auth/Login.js"
import { RegisterForm } from "./auth/Register.js"
import { DirectMessageList } from "./friends/DirectMessage.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers, fetchProfiles, getDisplayMessage } from "./data/provider.js"

import { GiffyGram } from "./GiffyGram.js"


const applicationElement = document.querySelector(".giffygram")


applicationElement.addEventListener(
    "stateChanged",
    () => {
        renderApp()
    }
)

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))

    fetchPosts()
        .then(fetchUsers)
        .then(fetchLikes)
        .then(fetchMessages)
        .then(fetchFollows)
        .then(fetchProfiles)
        .then(() => {
            const displayMessages = getDisplayMessage()
            if (displayMessages) {
                applicationElement.innerHTML = DirectMessageList()
            }
            else if (user) {
                applicationElement.innerHTML = GiffyGram()
            } 

            else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

renderApp()