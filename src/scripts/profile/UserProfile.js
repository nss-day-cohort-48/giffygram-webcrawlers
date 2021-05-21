import { PostList } from "../feed/PostList.js";
import { MessageForm } from "../message/MessageForm.js";
import { Footer } from "../nav/Footer.js";
import { NavBar } from "../nav/NavBar.js";
import { Profile } from "./profile.js";


export const UserProfile = (userId) => {
    return `
    ${NavBar()}
    ${MessageForm()}
    ${Profile(userId)}
<div class="giffygram__feed">
${ PostList() } 
</div>
${Footer()}`
};