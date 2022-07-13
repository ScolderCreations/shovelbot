import { Wasteof2Auth, Wasteof2 } from 'wasteof-client'
import { writeFileSync, readFileSync } from 'fs'

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
  let content = String(comment.content); // content of the comment
  let commentid = comment._id; // id of the comment
  let time = comment.time; // timestamp of the comment
  let responded = comment.hasReplies; // if the bot already responded
  console.log(comment)
 	/*await wastatic.getRepliesToComment(commentid, 0)
  .then(data => {
    if (!data[0]) return;
    if (data[0].poster.name == username) responded = true;
  })
*/

  var list = Object({
    "i'm %%": "<p>Welcome, %%! I am Shovel Knight!</p>",
    "you heard of among us": "<p>Among Us? What do you mean? Am I missing a joke?</p>",
    "hee! leave me alone": "<p>Show yourself, <b>Plague Knight</b>! Your trickery will not stop me.</p>",
    "knew you'd show your face sooner or later. The cerulean": "<p>Stand aside, %%! I've no quarrel with you. I must return to The Tower of Fate!</p>",
    "howdy bot": "Hello!",
    "Haven't you tired of this charade? Stay": "You never were one to blindly follow, %%, but The Order and the Enchantress must be stopped!",
    "You're headed down a ruinous path!": "The only path I seek leads to The Tower of Fate. And I will reach it."
  })

  if (responded) return;
  /* DO STUFF HERE */
  for (let con of Object.keys(list)) {
    if (content.toLowerCase().indexOf(con.toLowerCase().replace("%%", postername)) > 0) { 
      console.log("Detected phrase: " + con); 
      if (!(readFileSync("./history.bin").indexOf(commentid) > 0)) {
      wasteof.postWallComment(username, list[con].replace("%%", postername), commentid); 
      writeFileSync("./history.bin", commentid);
      }
      return; 
    };
  }
}

import express from 'express'

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send(String(Math.random()))
})
app.listen(port, () => {
  console.log(`server pinged!`)
})