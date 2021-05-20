import { LoginForm } from "./auth/Login.js"
import { fetchUsers, fetchFollows, fetchLikes, fetchMessages, fetchPosts } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"


const applicationElement = document.querySelector(".giffygram")


applicationElement.addEventListener(
    "stateChanged",
    () => {
        renderApp()
    }
)

export const renderApp = () => {
    fetchUsers()
    fetchPosts()
    fetchMessages()
    fetchFollows()
    fetchLikes()
    .then(() => {
        if (user) {
            applicationElement.innerHTML = GiffyGram()
        } else {
            applicationElement.innerHTML = LoginForm()
        }
    })
}

renderApp()