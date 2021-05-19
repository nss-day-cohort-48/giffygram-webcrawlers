import { LoginForm } from "./auth/Login.js"
import { fetchPosts, fetchUsers, fetchLikes, fetchMessages, fetchFollows   } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"


const applicationElement = document.querySelector(".giffygram")
const user = parseInt(localStorage.getItem("gg_user"))

export const renderApp = () => {
    fetchPosts()
    fetchUsers()
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