import { getProfiles, getUsers, updateProfile } from "../data/provider.js";
import { UserProfile } from "./UserProfile.js";


const applicationElement = document.querySelector(".giffygram");


// listens for when a user clicks on the edit profile button
applicationElement.addEventListener("click", event => {
    if (event.target.id === "editIcon") {

        // getting the logged in user id
        const userId = parseInt(localStorage.getItem("gg_user"))
            // finds the users corresponding user object
        const user = getUsers().find(user => user.id === userId)
            //get all profiles
        const profiles = getProfiles()
            // find the profile object that matches the user id and store it in a variable
        const userProfile = profiles.find(profile => profile.userId === userId)
            // stores the profile section in the html as a variable
        const profile = document.querySelector(".profile")
            // sets the html profile innerHTML to an updated string
        profile.innerHTML = ProfileUpdate(user.name, userProfile.pic, userProfile.age, userProfile.location, userProfile.about, user.email, user.password)
    }
})

// listens for when the user submits their profile edits
applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "UserProfileUpdateSubmit") {
        //gets the logged in user
        const userId = parseInt(localStorage.getItem("gg_user"));
        //get all profiles
        const profiles = getProfiles()
            // finds the profile id of the users profile
        const userProfileId = profiles.find(
            (profile) => profile.userId === userId
        ).id;
        // creates the updated profile object
        const profileUpdate = {
            id: userProfileId,
            userId: userId,
            pic: document.querySelector("#profileURL").value,
            age: document.querySelector("#profileAge").value,
            location: document.querySelector("#profileLocation").value,
            about: document.querySelector("#profileAbout").value,
        };
        // passes the updated profile to the API with a fetch PUT method
        updateProfile(profileUpdate)
    }
});

// listens for when a user hits the cancel button on the update profile form
applicationElement.addEventListener("click", event => {
    if (event.target.id === "newProfile__cancel") {
        const userId = parseInt(localStorage.getItem("gg_user"));
        applicationElement.innerHTML = UserProfile(userId)
    }
})

export const ProfileUpdate = (
    name,
    pic,
    age,
    location,
    about,
    contact,
    password
) => {
    return `
    <div class="userUpdate">
        <div>
        <label for="profileName">Name:</label>
            <input value="${name}" name="profileName" id="profileName" class="newPost__input" type="text" placeholder="Add URL of your picure">
        </div>
        <div>
        <label for="profileURL">Image Url:</label>
        <input value="${pic}" name="profileURL" id="profileURL" class="newPost__input" type="text" placeholder="Add URL of your picure">
        </div>
        <div>
        <label for="profileAge">Age:</label>
            <input value="${age}" name="profileAge" id="profileAge" class="newPost__input" type="number" placeholder="Age">
        </div>
        <div>
        <label for="profileLocation">Location:</label>
            <input value="${location}" name="profileLocation" id="profileLocation" class="newPost__input" type="text" placeholder="Location">
        </div>
        <label for="profileAbout">About:</label>
        <textarea name="profileAbout" id="profileAbout" class="newPost__input newPost__description" placeholder="Tell us about yourself...">${about}</textarea>
        <div>
        <label for="profileContact">Email:</label>
            <input value="${contact}" name="profileContact" id="profileContact" class="newPost__input" type="text" placeholder="Contact">
        </div>
        <div>
        <label for="profilePassword">Password:</label>
            <input value="${password}" name="profilePassword" id="profilePassword" class="newPost__input" type="text" placeholder="Location">
        </div>
        <button id="UserProfileUpdateSubmit">Save</button>
        <button id="newProfile__cancel">Cancel</button>
    </div>
    `;
};