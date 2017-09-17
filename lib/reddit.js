const dotenv = require('dotenv').config()
const snoowrap = require('snoowrap')

const reddit = new snoowrap({
  userAgent: '/u/bl4ckdu5t sia@1.1.0',
  clientId: process.env.REDDIT_ID,
  clientSecret: process.env.REDDIT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
})

module.exports = statement => {
  return reddit.search({
    query: statement,
    sort: 'comments'
  })
  // return reddit('/search').get({
  //   q: statement,
  //   type: 'comment'
  // }).then(result => {
  //   const comments = result.data.children
  //   console.log(result)
  //
  //   let bestIndex = null
  //   for(let i = 0; i < comments.length; i++){
  //     if(comments[i].data.num_comments > 0){
  //       bestIndex = i
  //       break;
  //     }
  //   }
  //   if(bestIndex === null){
  //     return 'no comment'
  //   }
  //   console.log(comments[bestIndex])
  //
  //   if(bestComment.data.subreddit === 'Jokes' || bestComment.data.subreddit === 'dadjokes'){
  //     return bestComment.data.selftext
  //   }
  //   return reddit(`/comments/${bestComment.data.id}`).get({
  //     depth: 1,
  //     limit: 5,
  //     sort: 'top'
  //   }).then(result => {
  //     const comments = result[1].data.children
  //     let topComment
  //     for(let i = 0; i < comments.length; i++){
  //       const text = comments[i].data.body
  //       if(text !== '[deleted]' && text !== '[removed]'){
  //         topComment = text;
  //         break;
  //       }
  //     }
  //     if(!topComment){
  //       return "ugh, you don't even want to know"
  //     }else{
  //       return topComment
  //     }
  //   })
  // })
}
