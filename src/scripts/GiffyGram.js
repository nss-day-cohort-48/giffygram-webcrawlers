import { MessageForm } from "./message/MessageForm.js"
import { NavBar } from "./nav/NavBar.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
        ${NavBar()}
        ${MessageForm()}
    `
}
