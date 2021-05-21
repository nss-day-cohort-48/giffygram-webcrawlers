import { getProfiles } from "../data/provider.js"

export const noProfile = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    const profiles = getProfiles()
    let hasProfile = false
    for (const profile of profiles) {
        if (profile.userId === user) {
            hasProfile = true
        }
    }
    if (!hasProfile) {
        return `<div class="noProfile">
                    <div>It appears you haven't set up your profile yet.</div>
                    <button id="setUpProfile">Set Up New Profile</button>
                    </div>`
    }
    return ''
}