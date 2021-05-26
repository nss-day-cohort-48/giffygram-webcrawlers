import { addProfile, getProfiles, getUsers } from "../data/provider.js"
import { ProfileSetup } from "./ProfileSetup.js"
import { ProfileUpdate } from "./ProfileUpdate.js"

const applicationElement = document.querySelector(".giffygram")

// listens for when user clicks on set up profile button
applicationElement.addEventListener("click", event => {
    if (event.target.id === "setUpProfile") {

        // sets the app html to the profile setup form
        applicationElement.innerHTML = ProfileSetup()
    }
})

// listens for when a user submits new profile information
applicationElement.addEventListener("click", event => {
    if (event.target.id === "newProfileSubmit") {

        // gets the logged in user
        const user = parseInt(localStorage.getItem("gg_user"))

        //creates a new profile object from the user input
        const newProfile = {
            userId: user,
            pic: document.querySelector("#profileURL").value,
            age: document.querySelector("#profileAge").value,
            location: document.querySelector("#profileLocation").value,
            about: document.querySelector("#profileAbout").value
        }

        //passes the profile object as an argument into the add profile function
        //add profile is a fetch call with the POST method
        addProfile(newProfile)
    }
})


// listens for when a user cancels during profile setup. this just re-renders the page
applicationElement.addEventListener("click", event => {
    if (event.target.id === "newProfileCancel") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

export const Profile = (userId) => {
        // get the logged in user
        const loggedInUser = parseInt(localStorage.getItem("gg_user"))
            // get all profiles
        const profiles = getProfiles()
            // get all users
        const users = getUsers()
            // find the user profile id that matches the user id we are passing in the this function
        const userProfile = profiles.find(profile => profile.userId === userId)
            // find the user object of the user id that was passed in to the function as an argument
        const user = users.find(user => user.id === userId)
        if (userProfile) {
            return `
        <section class="profile">
            <h1 class="profileName">${user.name}</h1>
            <div class="profileFlexOne">
                <img class="profileImage" src="${userProfile.pic}">
                <div class="profileInfo">
                    <div class="editDiv">
                        <div class="infoSpace editDiv"><b>Age:</b>  <div class="age">${userProfile.age}</div></div>
                        <div class="editIcon"><img id="editIcon" ${
                            //this checks whether the user that is logged in matches the profile being viewed
                            // if it does, we display an edit icon for the user to edit their profile
                            user.id === loggedInUser ? `src="../images/edit.svg"` : ``
                        }></div>
                    </div>
                    <div class="infoSpace location"><b>Location:</b>${userProfile.location}</div>
                    <div>
                    <h4>About Me:</h4>
                    <div class="about">${userProfile.about}</div>
                    </div>
                    <div class="infoSpace contact"><b>Contact:  </b>${user.email}</div>
                </div>
             </div>
        </section>`
        } else {
            // if the user does not have a profile set up. we display this html string to let all the other users knows that they are a dumb dumb stupid head loser AKA 'Meg'
            return `<div class="userNoProfile">
            <div>It appears that ${user.name} has not set up their profile</div>
            </div>`
        }
}