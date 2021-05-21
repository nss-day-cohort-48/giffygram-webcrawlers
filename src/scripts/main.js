import { LoginForm } from "./auth/Login.js"
import { RegisterForm } from "./auth/Register.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchProfiles, fetchUsers } from "./data/provider.js"
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
            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

renderApp()