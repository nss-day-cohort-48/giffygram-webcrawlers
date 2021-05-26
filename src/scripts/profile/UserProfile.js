import { PostList } from "../feed/PostList.js";
import { MessageForm } from "../message/MessageForm.js";
import { Footer } from "../nav/Footer.js";
import { NavBar } from "../nav/NavBar.js";
import { Profile } from "./profile.js";


export const UserProfile = (userId) => {
    return `
    ${NavBar()}
    ${MessageForm()}
    ${
        // this is the main difference from giffygram
        // the user id is coming from the provider.js as a transient state
        // we are passing that argument in the this function to display that user's profile
        Profile(userId)
    }
    <div class="giffygram__feed">
    ${ PostList() } 
    </div>
    <div class="footerSpace"></div>
    ${Footer()}`
};