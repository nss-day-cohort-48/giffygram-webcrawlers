import { LoginForm } from "./auth/Login.js"
<<<<<<< HEAD
import { fetchUsers, fetchFollows, fetchLikes, fetchMessages, fetchPosts } from "./data/provider.js"
=======
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers } from "./data/provider.js"
>>>>>>> a2ba16f117538b07cb71aaeefb4d48503ceedad8
import { GiffyGram } from "./GiffyGram.js"

const applicationElement = document.querySelector(".giffygram")


applicationElement.addEventListener(
    "stateChanged",
    () => {
        debugger
        renderApp()
    }
)

export const renderApp = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> a2ba16f117538b07cb71aaeefb4d48503ceedad8
}

renderApp()