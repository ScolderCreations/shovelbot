import { Wasteof2Auth, Wasteof2 } from 'wasteof-client'

let username = 'shovelknight';
let password = process.env['key'];
const wasteof = new Wasteof2Auth(username, password);
const wastatic = new Wasteof2();

await wasteof.login()
wasteof.listen(async (event) => {
    if (event.type == 'updateMessageCount') {
	await wastatic.getWallComments(username, 0)
	    .then(data => {
		replyToComment(data.comments[0]);
	    });
    }
});

async function replyToComment(comment) {
  if (!comment) return;
  let postername = comment.poster.name; // username the one leaving the comment
  let posterid = comment.poster.id; // id of the one leaving the comment
  let content = comment.content; // content of the comment
  let commentid = comment._id; // id of the comment
  let time = comment.time; // timestamp of the comment
  let responded = false; // if the bot already responded

 	await wastatic.getRepliesToComment(commentid, 0)
  .then(data => {
    if (!data[0]) return;
    if (data[0].poster.name == username) responded = true;
  })

  /* DO STUFF HERE */
  if (responded) return; // if the bot already responded to the comment, stop the function
  function dialog(con, say) {
    if (content.toLowerCase().includes(con.toLowerCase())) { wasteof.postWallComment(username, say, commentid); return true; }; return false; // reply to the comment
  }
  if (!dialog("begone from our throne room, knave", "I'm no more an intruder than you! You aren't even a real king!")) return;
  if (!dialog("The Enchantress saw me for my fabulously regal ", "You're naught but a decadent dandy! \
  Prepare to taste justice! \
  Shovel justice!")) return;
  dialog("I knew you'd show your face sooner or later. The cerulean coward!", `Stand aside, ${postername}! I've no quarrel with you. I must return to The Tower of Fate!`)
  dialog("Haven't you tired of this charade? Stay out of this", `You never were one to blindly follow, ${postername}, but The Order and the Enchantress must be stopped!`)
  dialog("You're headed down a ruinous pat", "The only path I seek leads to The Tower of Fate. And I will reach it.")
  dialog("Stop your meddling and turn back now", `I will reach her, ${postername}, even if I have to go through you.`)
  dialog(`I'm ${postername}`, `Greetings, ${postername}! I am Shovel Knight.`)

}