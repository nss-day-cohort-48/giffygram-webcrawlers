import { clearFilters, getFilters, setDateFilter, setFavoritesFilter, setUserFilter } from "../data/provider.js"
import { PostList } from "../feed/PostList.js"

const applicationElement = document.querySelector(".giffygram")


applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "yearSelection") {
            const date = event.target.value
            setDateFilter(date)

            const mainFeed = document.querySelector(".giffygram__feed")
            mainFeed.innerHTML = PostList()

            const filters = getFilters()
            const postCount = document.querySelector("#postCount")
            postCount.innerHTML = filters.postCount
        }
    }
)

applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "userSelection") {
            const [, userId] = event.target.value.split("--")
            setUserFilter(parseInt(userId))

            const mainFeed = document.querySelector(".giffygram__feed")
            mainFeed.innerHTML = PostList()

            const filters = getFilters()
            const postCount = document.querySelector("#postCount")
            postCount.innerHTML = filters.postCount
        }
    }
)

applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "showOnlyFavorites") {
            if (event.target.checked) {
                let isChecked = true
                setFavoritesFilter(isChecked)

                const mainFeed = document.querySelector(".giffygram__feed")
                mainFeed.innerHTML = PostList()

                const filters = getFilters()
                const postCount = document.querySelector("#postCount")
                postCount.innerHTML = filters.postCount
            } else {
                let isChecked = false
                setFavoritesFilter(isChecked)

                const mainFeed = document.querySelector(".giffygram__feed")
                mainFeed.innerHTML = PostList()

                const filters = getFilters()
                const postCount = document.querySelector("#postCount")
                postCount.innerHTML = filters.postCount
            }
        }
    }
)

applicationElement.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "clearFilters") {
            clearFilters()
            const mainFeed = document.querySelector(".giffygram__feed")
            const checkBox = document.querySelector("#showOnlyFavorites")
            checkBox.checked = false
            mainFeed.innerHTML = PostList()

        }
    }
)

const button = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

document.addEventListener("click", event => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

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
                        
                            <option value="user--1">Ray Medrano</option>
                        ,
                            <option value="user--2">Meg Ducharme</option>
                        ,
                            <option value="user--3">Mark Ellis</option>
                        ,
                            <option value="user--4">Daniella Agnoletti</option>
                        ,
                            <option value="user--5">Kimmy Bird</option>
                        ,
                            <option value="user--6">Emily Lemmon</option>
                        
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