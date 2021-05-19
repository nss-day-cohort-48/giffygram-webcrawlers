import { LoginForm } from "./auth/Login.js"
import { fetchData } from "./data/provider.js"
import { GiffyGram } from "./GiffyGram.js"


const applicationElement = document.querySelector(".giffygram")
const user = parseInt(localStorage.getItem("gg_user"))

export const renderApp = () => {
    fetchData().then(() => {
        if (user) {
            applicationElement.innerHTML = GiffyGram()
        } else {
            applicationElement.innerHTML = LoginForm()
        }
    })
}

renderApp()