import { getProfiles } from "../data/provider.js"

export const noProfile = () => {
    // gets the logged in user
    const user = parseInt(localStorage.getItem("gg_user"))
        // gets the list of all profiles
    const profiles = getProfiles()
        // iterates through every profile and checks whether the logged in user has a profile
    let hasProfile = false
    for (const profile of profiles) {
        if (profile.userId === user) {
            // if so, we set the hasProfile variable to true
            hasProfile = true
        }
    }
    // if they do not have a profile we return this html element that lets the user know that they need to set up their profile
    if (!hasProfile) {
        return `<div class="noProfile">
                    <div>It appears you haven't set up your profile yet.</div>
                    <button id="setUpProfile">Set Up New Profile</button>
                    </div>`
    }
    // if they do have a profile, this code runs and the element does not appear in the DOM
    return ''
}