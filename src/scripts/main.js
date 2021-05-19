import { LoginForm } from "./auth/Login.js"
import { fetchData } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./Login.js"


const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    fetchData().then(() => {
        const user = parseInt(localStorage.getItem("gg_user"))
        if (user) {
            applicationElement.innerHTML = GiffyGram()
        } else {
            applicationElement.innerHTML = LoginForm()
        }
    })
}

renderApp()