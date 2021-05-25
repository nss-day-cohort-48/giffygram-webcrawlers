import { getMessages, getUsers, markMessageAsRead, deleteMessage } from "../data/provider.js"

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("markAsRead--")) {
        const [, messageId] = clickEvent.target.id.split("--")
        
        markMessageAsRead(parseInt(messageId))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteMessage--")) {
        const [, messageId] = clickEvent.target.id.split("--")
        deleteMessage(parseInt(messageId))
    }
})


export const MessageList = () => {
    const messages = getMessages()
    const users = getUsers()
    const currentUser = parseInt(localStorage.getItem("gg_user")) //

    const html = `
    <div class="messageList">
        ${messages.map(message => {
            const sender = users.find(user => message.userId === user.id)
            if(currentUser === message.recipientId) // checks to make sure that the users id that is stored in local storage is strictly equal to the recipientId on the message object
            return `<div class="message" id="message__${message.id}">
                        <div class="message__author">From ${sender.name}</div>
                        <div class="message__text">${message.text}</div>
                        <button id="markAsRead--${message.id}">mark as read</button>
                        <button id="deleteMessage--${message.id}">Delete Message</button>
                    </div>`
            }).join("")
        }
    </div>`

    return html
}
