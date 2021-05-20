import { setDateFilter } from "../data/provider.js"
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
        }
    }
)

export const Footer = () => {

    return `<footer class="footer">
                <div class="footer__item">
                    Posts since <select id="yearSelection">
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                    </select>
                    <span id="postCount">1</span>
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
            </footer>`
}