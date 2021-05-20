import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"
import { MessageForm } from "./message/MessageForm.js"
import { Footer } from "./nav/Footer.js"


export const GiffyGram = () => {

    // Show main main UI
    return `
        ${NavBar()}
        ${MessageForm()}
    <div class="postEntry">
    <div class="miniMode" id="miniMode">Have a gif to post?
    </div></div>
    <div class="giffygram__feed">
    ${ PostList() } 
    </div>
    ${Footer()}`
}