import { getMessages, setDisplayMessage, clearFilters, setUserFilter, getFilters, getProfiles, setView } from "../data/provider.js"
import { PostList } from "../feed/PostList.js"
import { ProfileSetup } from "../profile/ProfileSetup.js"
import { UserProfile } from "../profile/UserProfile.js"

const applicationElement = document.querySelector(".giffygram")

document.addEventListener("click", event => {
    if (event.target.id === "logout") {
        localStorage.removeItem("gg_user")
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", event => {
    if (event.target.classList.contains("notification__count")) {
        setDisplayMessage(true)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "logo") {
        clearFilters()
        setView(false)
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "navigationProfile") {
        const user = parseInt(localStorage.getItem("gg_user"))
        const profiles = getProfiles()
        let hasProfile = false
        for (const profile of profiles) {
            if (profile.userId === user) {
                hasProfile = true
            }
        }
        if (hasProfile) {
            applicationElement.innerHTML = UserProfile(user)
            setUserFilter(user)
            const mainFeed = document.querySelector(".giffygram__feed")
            mainFeed.innerHTML = PostList()
            const filters = getFilters()
            const postCount = document.querySelector("#postCount")
            postCount.innerHTML = filters.postCount

        } else {
            applicationElement.innerHTML = ProfileSetup()
        }
    }
})

export const NavBar = () => {
    const messages = getMessages()
    const currentUser = parseInt(localStorage.getItem("gg_user"))
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
                    ${ messages.filter(message => currentUser === message.recipientId).length }
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
