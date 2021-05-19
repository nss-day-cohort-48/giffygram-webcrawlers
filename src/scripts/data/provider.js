const apiURL = "http://localhost:3000"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
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