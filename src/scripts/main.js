import { LoginForm } from "./auth/Login.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"
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
    fetchUsers()
    fetchPosts()
    fetchLikes()
    fetchMessages()
    fetchFollows()
        .then(() => {
            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

renderApp()