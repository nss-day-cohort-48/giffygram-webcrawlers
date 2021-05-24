import { addProfile, getProfiles, getUsers } from "../data/provider.js"
import { ProfileSetup } from "./ProfileSetup.js"
import { ProfileUpdate } from "./ProfileUpdate.js"

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
        const loggedInUser = parseInt(localStorage.getItem("gg_user"))
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
                <div class="editDiv">
                    <div class="infoSpace editDiv"><b>Age:</b>  <div class="age">${userProfile.age}</div></div>
                    <div class="editIcon"><img id="editIcon" ${user.id === loggedInUser ? `src="../images/edit.svg"` : ``}></div>
                </div>
                <div class="infoSpace location"><b>Location:</b>${userProfile.location}</div>
                <div>
                <h4>About Me:</h4>
                <div class="about">${userProfile.about}</div>
                </div>
                <div class="infoSpace contact"><b>Contact:  </b>${user.email}</div>
            </div>
         </div>
    </section>
    `
}