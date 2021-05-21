import { getUsers, sendMessage } from "../data/provider.js"
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
        //when this event happens, it sets the value of messageBox to false, it changes state and renders the html for the messageBox
        messageBox = false
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessage__submit") {
        const recipient = applicationElement.querySelector("select[name='directMessage__userSelect']").value
        const text = applicationElement.querySelector("input[name='message']").value
        const [, recipientId] = recipient.split("--") // the comma is a spread opereater. it spreads the objects in the array into strings seperated by a comma

        const messageObject = {
            userId: parseInt(localStorage.getItem("gg_user")), // converting the userId number that is in a string into an integer
            recipientId: parseInt(recipientId), //turns the number that is in a string, inside of the deconstructed array above, into an integer, and assigning it the varible recipientId
            text: text
        }

        sendMessage(messageObject) //invokes the sendMessage function that contains the object with the converted keys
    }
})


export const MessageForm = () => {
   const users = getUsers()
//if messageBox is true, it will return and empty string and nothing will display, else it will return the string in the return statement
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
                                    return `<option value="messageRecipient--${user.id}">${user.name}</option>
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