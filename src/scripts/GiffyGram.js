import { NavBar } from "./nav/NavBar.js"
import { PostList } from "./feed/PostList.js"
import { MessageForm } from "./message/MessageForm.js"
import { Footer } from "./nav/Footer.js"
import { noProfile } from "./profile/noProfile.js"
import { PostEntry } from "./feed/PostEntry.js"



//returns html of the main feed
export const GiffyGram = () => {

    return `
        ${NavBar()}
        ${noProfile()}
        ${MessageForm()}
        <div class="postEntry">
            <div class="miniMode" id="miniMode">Have a gif to post?</div>
        </div>
    <div class="giffygram__feed">
    ${ PostList() } 
    </div>
    <div class="footerSpace"></div>

    ${Footer()}`
}