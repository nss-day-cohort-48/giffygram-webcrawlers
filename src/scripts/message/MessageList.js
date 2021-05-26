import { getMessages, getUsers, markMessageAsRead, deleteMessage } from "../data/provider.js"

// listens for when the user marks messages as read
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("markAsRead--")) {

        //stores the message id in a variable
        const [, messageId] = clickEvent.target.id.split("--")

        // this modifies the message object in the API to have a read boolean of "true"
        markMessageAsRead(parseInt(messageId))
    }
})

// listens for when a user deletes a message
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteMessage--")) {

        // stores the message id in a variable
        const [, messageId] = clickEvent.target.id.split("--")

        //runs a fetch call with the DELETE method to remove the object from the API
        deleteMessage(parseInt(messageId))
    }
})

export const MessageList = () => {
        // gets all messages
        const messages = getMessages()
            // gets all users
        const users = getUsers()
            // gets the logged in users
        const currentUser = parseInt(localStorage.getItem("gg_user")) //

        const html = `
    <div class="messageList">
    
        ${messages.map(message => {
            // finding the sender of the message
            // for each user we are searching for the one where the message.userId === the user.id
            const sender = users.find(user => message.userId === user.id)
            if(currentUser === message.recipientId) 
            // checks to make sure that the users id that is stored in local storage is strictly equal to the recipientId on the message object
            return `<div class="message" id="message__${message.id}">
                        <div class="message__author">From ${sender.name}</div>
                        <div class="message__text">${message.text}</div>
                        <button id="markAsRead--${message.id}">mark as read</button>
                        <button id="deleteMessage--${message.id}">Delete Message</button>
                    </div>`
            }).join("")
        }
    </div>`
        // returns the message list html
    return html
}