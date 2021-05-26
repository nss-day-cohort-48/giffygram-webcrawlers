import { LoginForm } from "./auth/Login.js"
import { RegisterForm } from "./auth/Register.js"
import { DirectMessageList } from "./friends/DirectMessage.js"
import { fetchFollows, fetchLikes, fetchMessages, fetchPosts, fetchUsers, fetchProfiles, getDisplayMessage, getView } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"
import { UserProfile } from "./profile/UserProfile.js"

const applicationElement = document.querySelector(".giffygram")


// used to get new state after any changes to the data
applicationElement.addEventListener(
    "stateChanged",
    () => {
        renderApp()
    }
)

export const renderApp = () => {
        // runs a list of fetch calls to get data from the API
        fetchPosts()
            .then(fetchUsers)
            .then(fetchLikes)
            .then(fetchMessages)
            .then(fetchFollows)
            .then(fetchProfiles)
            .then(() => {
                //grabs the logged in user
                const user = parseInt(localStorage.getItem("gg_user"))
                    // gets a list of the messages
                const displayMessages = getDisplayMessage()
                    // gets the current view state (an object with 2 key value pairs: onProfile(boolean) and userId)
                const view = getView()

                if (displayMessages) {
                    // determines whether user has clicked on the message icon and displays messages
                    applicationElement.innerHTML = DirectMessageList()
                } else if (view.onProfile) { //this view.onProfile is set to true when a user clicks on a link that will send them to the user's profile
                    // determines whether user has clicked on a profile link and displays the relevant profile
                    applicationElement.innerHTML = UserProfile(view.userId)
                } else if (user) {
                    // checks if user is logged in and displays their feed
                    applicationElement.innerHTML = GiffyGram()
                } else {
                    // if user is not logged in, displays the login form
                    applicationElement.innerHTML = LoginForm()
                }
            })
    }
    // initial call of the app
renderApp()