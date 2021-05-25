import { getProfiles, getUsers, updateProfile } from "../data/provider.js";
import { UserProfile } from "./UserProfile.js";


const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "editIcon") {
        const editElement = document.querySelector(".editIcon")
        const editIcon = `<img id="editIcon" src="../images/edit.svg">`
        const saveIcon = `<img id="editIcon" src="../images/save.svg">`
        if (editElement.innerHTML === editIcon) {
            editElement.innerHTML = saveIcon
            const userId = parseInt(localStorage.getItem("gg_user"))
            const user = getUsers().find(user => user.id === userId)
            const userProfile = getProfiles().find(profile => profile.userId === userId)
            const profile = document.querySelector(".profile")
            profile.innerHTML = ProfileUpdate(user.name, userProfile.pic, userProfile.age, userProfile.location, userProfile.about, user.email, user.password)

        } else {
            editElement.innerHTML = editIcon
        }
    }
})

applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "UserProfileUpdateSubmit") {
        const userId = parseInt(localStorage.getItem("gg_user"));
        const userProfileId = getProfiles().find(
            (profile) => profile.userId === userId
        ).id;
        const profileUpdate = {
            id: userProfileId,
            userId: userId,
            pic: document.querySelector("#profileURL").value,
            age: document.querySelector("#profileAge").value,
            location: document.querySelector("#profileLocation").value,
            about: document.querySelector("#profileAbout").value,
        };
        updateProfile(profileUpdate)
        applicationElement.innerHTML = UserProfile(userId)
    }
});

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