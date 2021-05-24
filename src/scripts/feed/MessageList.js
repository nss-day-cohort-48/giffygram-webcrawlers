import { getMessages, getUsers } from "../data/provider.js"

export const MessageList = () => {
    const messages = getMessages()
    const users = getUsers()
    const currentUser = parseInt(localStorage.getItem("gg_user")) //

    const html = `<div class="messageList">
        ${messages.map(message => {
            const sender = users.find(user => message.userId === user.id)
            if(currentUser === message.recipientId) // checks to make sure that the users id that is stored in local storage is strictly equal to the recipientId on the message object
            return `<div class="message" id="message--${message.id}">
                        <div class="message__author">From ${sender.name}</div>
                        <div class="message__text">${message.text}</div>
                    </div>`
            }).join("")
        }
    </div>`

    return html
}
