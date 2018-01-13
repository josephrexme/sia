# Sia
[![Build Status](https://travis-ci.org/josephrexme/sia.svg?branch=master)](https://travis-ci.org/josephrexme/sia)
[![Coverage Status](https://coveralls.io/repos/github/josephrexme/sia/badge.svg?branch=master)](https://coveralls.io/github/josephrexme/sia?branch=master)
[![bitHound Code](https://www.bithound.io/github/josephrexme/sia/badges/code.svg)](https://www.bithound.io/github/josephrexme/sia)

<!-- [![Known Vulnerabilities](https://snyk.io/test/github/snyk/goof/badge.svg)](https://snyk.io/test/github/snyk/goof) -->

<img src="https://cdn.rawgit.com/josephrexme/sia/7aaa9f8b/data/Sia.jpg" alt="Sia" width="250">

Sia (Sentient Intelligent Android) is an AI bot for slack. Sia currently uses template based intelligence through [rivescript][1] along with NLP through [watson][6] and was made with [Node-Slack-SDK][2].

### Example conversation with Sia
This is just some of the features of Sia.

![conversation with](https://cdn.rawgit.com/josephrexme/sia/7aaa9f8b/data/conversation.jpg)

## Acknowledgement
Thanks to @genericallyloud for his guide on making rivescript asynchronous. I use [my own fork][7] of [rivescript-js][8] to get promise support. Although, it appears [there soon would be proper promise support][9] on the library, it wasn't available at the time of making sia and there'd be no Sia if I had to wait.

## LICENSE
Released under [MIT License][3], Copyright (c) 2017 Joseph Rex

See [LICENSE][4] for more information

[1]: https://www.rivescript.com
[2]: https://github.com/slackapi/node-slack-sdk
[3]: https://opensource.org/licenses/MIT
[4]: https://github.com/josephrexme/sia/blob/master/LICENSE
[5]: https://github.com/genericallyloud/rivescript-js
[6]: https://www.ibm.com/watson/
[7]: https://github.com/josephrexme/rivescript-promises
[8]: https://github.com/aichaos/rivescript-js/
[9]: https://github.com/aichaos/rivescript-js/pull/248
