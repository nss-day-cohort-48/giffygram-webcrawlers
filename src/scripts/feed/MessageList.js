import { getMessages, getUsers } from "../data/provider.js"

export const MessageList = () => {
    const messages = getMessages()
    const users = getUsers()

    const html = `<div class="messageList">
        ${messages.map(message => {
            const sender = users.find(user => message.userId === user.id)
            return `<div class="message" id="message--${message.id}">
                        <div class="message__author">From ${sender.name}</div>
                        <div class="message__text">${message.text}</div>
                    </div>`
            }).join("")
        }
    </div>`

    return html
}
