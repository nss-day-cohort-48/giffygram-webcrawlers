import { getUsers } from "../data/provider.js"
const applicationElement = document.querySelector(".giffygram")

//setting the initial value of boolean "messageBox" to true, it is true that it is not open upon rendering dom
let messageBox = true

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessage__close") {
        //when this event happens, it sets the value of messageBox to true
        messageBox = true
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessageIcon") {
        //when this event happens, it sets the value of messageBox to false, it changes state and renders the html
        messageBox = false
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})




export const MessageForm = () => {
   const users = getUsers()
//if messageBox it true, it will return and empty string and nothing will display, else it will return the string in the return statement
    if (messageBox) {
        return ""
    }
    else { 
        return ` 
            <div class="directMessage">
                <h3>Direct Message</h3>
                <div>Recipient:
                    <select name="directMessage__userSelect" class="message__input">
                        <option>Choose a recipient...</option>
                        ${
                            users.map(
                                (user) => {
                                    return `<option value="messageRecipient--${user.name}">${user.name}</option>
                                `})
                        }
                    </select>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <input name="message"
                        class="message__input"
                        type="text"
                        placeholder="Message to user" />
                </div>

                <button id="directMessage__submit">Save</button>
                <button id="directMessage__cancel">Cancel</button>

                <button id="directMessage__close">x</button>

            </div>
        `
    }
}