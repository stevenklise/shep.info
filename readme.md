# ITPIRL

## Changelog

### 0.8.0 - 2012/03/28

- Create a separate IRC Client instance for every itpirl.com user.
- Route messages from Now.js => IRC => Now.js.
- Create custom message receive and distribute methods.
- Move files from app/ to lib/ and split CoffeeScripts between client and server.

### 0.7.4 - 2012/03/21

- Fluid layout with minimum width of 960px. This fixes the scrollbars issue.
- Functional, ugly, user list.

### 0.7.3 - 2012/03/20

- Improve colors and layout.
- Allow users to change their name w/o refresh
- Notify chatroom when users join and leave.

### 0.7.2 - 2012/03/19

- Fix wordwrapping in chat messages with word-wrap:break-word;
- Implement feedback widget, posting to cakemix.

### 0.7.1 - 2012/03/19 10:30am

- Log messages to www.itpcakemix.com
- Watch for messages to 'shep' or 'shepbot' for chat highlighting

### 0.7.0 - 2012/03/18

First version with a version number.

- Chat using irc.freenode.net and one instance of a chat client
- Calendar from itp-api.info is broken.
- Consecutive messages from the same sender are styled as such.
- Highlight shep and self messages.
- Insert `<a>` tags for urls starting with http or https.
- Format message text for bold (`**bold**`) and italic (`*italic*`), but do so sloppily.