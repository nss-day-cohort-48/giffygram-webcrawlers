import { NavBar } from "../nav/NavBar.js";
import { MessageList } from "../feed/MessageList.js";

export const DirectMessageList = () => {
  return `

${NavBar()}
<div class="messages">
${MessageList()}
</div>

`;
};
