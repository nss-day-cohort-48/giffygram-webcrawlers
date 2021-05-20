import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"
import { Footer } from "./nav/Footer.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
        ${NavBar()}
        <div class="postEntry">
        <div class="miniMode" id="miniMode">Have a gif to post?
        </div></div>
        ${PostList()}
        ${Footer()}`
}