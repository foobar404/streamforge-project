const express = require("express")
const fetch = require('node-fetch');
var cors = require('cors')
const server = express()
const db = require("./model.js")

server.use(cors())
server.use(express.json())

server.get("/twitch/:username",async (req,res)=>{
    
    let username = req.params.username
    let headers = {
        method:"GET",
        headers:{
            "Client-ID":"kimne78kx3ncx6brgo4mv6wki5h1ko",
            "Accept":"application/vnd.twitchtv.v5+json"
        }
    }

    //check cache
    let cache = await db.find(username)
   
    if(cache.length){
        console.log("Cache hit")
        res.send(cache[0])
        return 
    }

    let body1 = await fetch(`https://api.twitch.tv/kraken/users?login=${username}`, headers)
    let obj1 = await body1.json()
    
    //check if username exists 
    if(!obj1.users.length){
        res.send({
            error:"user does not exist"
        }).status(404)
        return 
    }

    let {_id} = obj1.users[0]

    let body2 = await fetch(`https://api.twitch.tv/kraken/channels/${_id}/follows`,headers)
    let {_total} = await body2.json()

    //add to cache 
    await db.insert({username,followers:_total})
    
    // remove after 5 minutes 
    setTimeout(async ()=> await db.remove(username),1000 * 60 * 5) 

    res.send({followers:_total})

})

server.listen(80, console.log("server is live on port 80"))




