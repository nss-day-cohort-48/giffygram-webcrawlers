import { addProfile, getProfiles, getUsers } from "../data/provider.js"
import { ProfileSetup } from "./ProfileSetup.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", event => {
    if (event.target.id === "setUpProfile") {
        applicationElement.innerHTML = ProfileSetup()
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newProfileSubmit") {
        const user = parseInt(localStorage.getItem("gg_user"))
        const newProfile = {
            userId: user,
            pic: document.querySelector("#profileURL").value,
            age: document.querySelector("#profileAge").value,
            location: document.querySelector("#profileLocation").value,
            about: document.querySelector("#profileAbout").value
        }
        addProfile(newProfile)
    }
})

export const Profile = (userId) => {
    const profiles = getProfiles()
    const users = getUsers()
    const userProfile = profiles.find(profile => profile.userId === userId)
    const user = users.find(user => user.id === userId)
    return `
    <section class="profile">
        <h1 class="profileName">${user.name}</h1>
        <div class="profileFlexOne">
            <img class="profileImage" src="${userProfile.pic}">
            <div class="profileInfo">
                <div class="infoSpace"><b>Age:</b>  ${userProfile.age}</div>
                <div class="infoSpace"><b>Location:</b>  ${userProfile.location}</div>
                <div>
                <h4>About Me:</h4>
                <div>${userProfile.about}</div>
                </div>
                <div class="infoSpace"><b>Contact:  </b>${user.email}</div>
            </div>
         </div>
    </section>
    `
}