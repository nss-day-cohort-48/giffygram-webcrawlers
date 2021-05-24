import { getMessages, setDisplayMessage, clearFilters } from "../data/provider.js"

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
        document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
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
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
        `
}