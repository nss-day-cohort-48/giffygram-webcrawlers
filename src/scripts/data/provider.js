const apiURL = "http://localhost:3000"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayLikes: false,
        displayMessages: false
    }
}

export const getUsers = () => {
    return [...applicationState.users]
}

export const getPosts = () => {
    return [...applicationState.posts]
}

export const getLikes = () => {
    return [...applicationState.likes]
}

export const getMessages = () => {
    return [...applicationState.messages]
}

export const fetchData = () => {
    return fetch(`${apiURL}`)
        .then(res => res.json())
        .then(
            (database) => {
                applicationState.database = database
            }
        )
}

