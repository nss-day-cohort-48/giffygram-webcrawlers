import { clearFilters, getFilters, getUsers, setDateFilter, setFavoritesFilter, setUserFilter } from "../data/provider.js"
import { PostList } from "../feed/PostList.js"

const applicationElement = document.querySelector(".giffygram")

// listens for when the user filter by year
applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "yearSelection") {

            // sets the date selected by the user in a variable
            const date = event.target.value
                // sets the date as transient state
            setDateFilter(date)

            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

            // gets all filters
            const filters = getFilters()
                //sets variable to the element where we display the post count
            const postCount = document.querySelector("#postCount")
                // changes that variables innerHTML to the post count from our filter object in transient state
            postCount.innerHTML = filters.postCount
        }
    }
)

// listens for when the user filters by users
applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "userSelection") {
            // stors the user id in a variable
            const [, userId] = event.target.value.split("--")
                // sets the user filter as transient state
            setUserFilter(parseInt(userId))

            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

            // gets all filters
            const filters = getFilters()
                //sets variable to the element where we display the post count
            const postCount = document.querySelector("#postCount")
                // changes that variables innerHTML to the post count from our filter object in transient state
            postCount.innerHTML = filters.postCount
        }
    }
)

// listens for when the user filters by favorites
applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "showOnlyFavorites") {
            if (event.target.checked) {
                // sets the variable of isChecked to true
                let isChecked = true
                    // sets the transient state of the filtered by favorites to true
                setFavoritesFilter(isChecked)

                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

                // gets all filters
                const filters = getFilters()
                    //sets variable to the element where we display the post count
                const postCount = document.querySelector("#postCount")
                    // changes that variables innerHTML to the post count from our filter object in transient state
                postCount.innerHTML = filters.postCount
            } else {
                // sets the variable of isChecked to false
                let isChecked = false
                    // sets the transient state of the filtered by favorites to false
                setFavoritesFilter(isChecked)

                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

                // gets all filters
                const filters = getFilters()
                    //sets variable to the element where we display the post count
                const postCount = document.querySelector("#postCount")
                    // changes that variables innerHTML to the post count from our filter object in transient state
                postCount.innerHTML = filters.postCount
            }
        }
    }
)

// listens for when the user clicks the clear filters button
applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "clearFilters") {
            // resets all the transient filters to null/false
            clearFilters()

            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))


            // stores the checkboc in the DOM to a variable
            const checkBox = document.querySelector("#showOnlyFavorites")
                // sets the checkboc to unchecked
            checkBox.checked = false

            // mainFeed.innerHTML = PostList()

        }
    }
)

// Check for dark mode preference at the OS level
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem("theme")
    // If the user's preference in localStorage is dark already,
if (currentTheme == "dark") {
    // then toggle the .dark-theme class on the body
    document.body.classList.toggle("dark-theme")
        // Or, if the user's preference in localStorage is light
} else if (currentTheme == "light") {
    // then they can toggle the .light-theme class on the body
    document.body.classList.toggle("light-theme")
}

// Listen for a click on the button on the page 
document.addEventListener("click", (clickEvent) => {
    // If the user's OS setting is dark and matches our .dark-mode class
    if (clickEvent.target.id === "btn-toggle") {
        // allows the user to target the id of button toggle to trigger the mouse event

        //button.addEventListener('click', ()=>{  

        if (prefersDarkScheme.matches) {
            //then toggle to the light mode class
            document.body.classList.toggle("light-theme")
                //but use .dark-mode if the .light-mode class is already running in the body,
            var theme = document.body.classList.contains("light-theme") ?
                "light" :
                "dark";
        } else {
            //Otherwise, do the same, but for .dark-mode
            document.body.classList.toggle("dark-theme")
            var theme = document.body.classList.contains("dark-theme") ?
                "dark" :
                "light";
        }
        // Saves the current preference to localStorage for the user to keep using it in this mode
        localStorage.setItem("theme", theme)
    }
})

export const Footer = () => {

    return `<footer class="footer">
                <div class="footer__item">
                    Posts since <select id="yearSelection">
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                    </select>
                
                </div>
                <div class="footer__item">
                    Posts by user <select id="userSelection">
                        
                           ${footerList()}
                        
                    </select>
                </div>
                <div class="footer__item">
                Show only favorites <input id="showOnlyFavorites" type="checkbox">
                </div>
                <div>Posts:</div>
                <div>
                <span id="postCount"></span>
                </div>
                <div>
                <button id="clearFilters">Clear Filters</button>
                </div>
                <div><span id="darkMode"></span></div>
                <div class="navigation__item navigation__darkmode">
            <button id="btn-toggle" class="toggleBtn">Dark-Mode</button>
            </div>
            </footer>`
}

const footerList = () => {
    // gets all users
    const users = getUsers()
    let html = ''
    users.forEach(user => {
        // add the the string an html representation of an option element with the users data interpolated
        html += `<option value="user--${user.id}">${user.name}</option>`
    })
    return html
}