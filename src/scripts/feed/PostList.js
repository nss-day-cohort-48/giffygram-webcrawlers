import {getLikes, getPosts, getUsers} from '../data/provider.js'
import { Post } from '../feed/Post.js'

export const PostList = ()=>{
    
    const posts = getPosts()
  
    let html = `
        <ul>
            ${posts}.map( 
        (postsObject) => { 
            return `
                <li> 
            ${postsObject.id}" /> ${postsObject.name}
            </li>`
        }
    )
            .join("")
        }
        </ul>
    `

    return html
}