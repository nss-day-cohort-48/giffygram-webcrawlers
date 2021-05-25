import { LoginForm } from "./auth/Login.js"
import { RegisterForm } from "./auth/Register.js"
import { DirectMessageList } from "./friends/DirectMessage.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers, fetchProfiles, getDisplayMessage, getView } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"
import { UserProfile } from "./profile/UserProfile.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener(
    "stateChanged",
    () => {
        renderApp()
    }
)

export const renderApp = () => {
    fetchPosts()
        .then(fetchUsers)
        .then(fetchLikes)
        .then(fetchMessages)
        .then(fetchFollows)
        .then(fetchProfiles)
        .then(() => {
            const user = parseInt(localStorage.getItem("gg_user"))
            const displayMessages = getDisplayMessage()
            const view = getView()
            if (displayMessages) {
                applicationElement.innerHTML = DirectMessageList()
            } else if (view.onProfile) {
                applicationElement.innerHTML = UserProfile(view.userId)
            } else if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
}

renderApp()