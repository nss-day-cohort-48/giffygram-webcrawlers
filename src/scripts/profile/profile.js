import { getProfiles, getUsers } from "../data/provider.js"

export const Profile = (userId) => {
    const profiles = getProfiles()
    const users = getUsers()
    const userProfile = profiles.find(profile => profile.userId === userId)
    const user = users.find(user => user.id === userId)
    return `
    <section class="profile">
    <h1 class="profileName">${user.name}</h1>
    <img class="profileImage" src="${userProfile.pic}">
    </section>
    `
}