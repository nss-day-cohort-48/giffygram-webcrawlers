import { PostEntry } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"


export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>

    <div class="postEntry">
    <div class="miniMode" id="miniMode">Have a gif to post?
    </div></div>
    ${ PostList() }`


