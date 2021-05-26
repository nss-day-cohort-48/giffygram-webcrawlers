import { getMessages, setDisplayMessage, clearFilters, setUserFilter, getFilters, getProfiles, setView } from "../data/provider.js"
import { PostList } from "../feed/PostList.js"
import { ProfileSetup } from "../profile/ProfileSetup.js"
import { UserProfile } from "../profile/UserProfile.js"

const applicationElement = document.querySelector(".giffygram")

// listens for user to click logout
document.addEventListener("click", event => {
    if (event.target.id === "logout") {

        // removes the localstorage item
        localStorage.removeItem("gg_user")
        clearFilters()
        setView(false)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// this listens for when the user clicks on their message count icon
document.addEventListener("click", event => {
    if (event.target.classList.contains("notification__count")) {

        //sets transient state display message to true
        //when render is called we are directed to our message feed
        setDisplayMessage(true)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// listens for when a user clicks on the giffygram logo
document.addEventListener("click", event => {
    if (event.target.id === "logo") {
        // clears all filters
        clearFilters()
            // changes the view from profile view to main feed
        setView(false)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// listens for when a user clicks on their profile link
document.addEventListener("click", event => {
    if (event.target.id === "navigationProfile") {

        //gets logged in user
        const user = parseInt(localStorage.getItem("gg_user"))

        //gets all profiles
        const profiles = getProfiles()

        // iterate through every profile and check whether the logged in user has a profile matching their user id
        let hasProfile = false
        for (const profile of profiles) {
            if (profile.userId === user) {
                // if they have a profile present in the data, we set this variable to true
                hasProfile = true
            }
        }
        if (hasProfile) {

            //set the transient state of onProfile to true and pass in the user id
            setView(hasProfile, user)

            //filter feed by the user
            setUserFilter(user)

            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        } else {
            // if they do not have a profile, we redirect them to set one up
            applicationElement.innerHTML = ProfileSetup()
        }
    }
})

export const NavBar = () => {
    // gets a list of all messages
    const messages = getMessages()
        // gets the loggin in user
    const currentUser = parseInt(localStorage.getItem("gg_user"))
        // returns an html string of the navbar

    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo" />
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            
            <div class="navigation__item navigation__search">
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct message" />
                
                <div class="notification__count">
                    ${
                        // this adds up all the unread messages for the logged in user and displays the count
                        messages.filter(message => currentUser === message.recipientId && message.read === false).length 
                    }
                </div>
            </div>
            <div class="navigation__item navigation__profile">
                <img id="navigationProfile" src="../images/profile.svg">
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
        `
}