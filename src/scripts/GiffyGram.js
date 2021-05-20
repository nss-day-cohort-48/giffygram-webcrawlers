import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"
import { MessageForm } from "./message/MessageForm.js"


export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
        ${NavBar()}
        ${MessageForm()}
    <div class="postEntry">
    <div class="miniMode" id="miniMode">Have a gif to post?
    </div></div>
    ${ PostList() }` 
}

