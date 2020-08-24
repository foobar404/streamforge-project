let knex = require("./data/config.js")

function insert(record){
    return knex("usernames").insert(record)
}

function remove(username){
    return knex('usernames').where("username","=",username).del()
}

function find(username){
    return knex.select("*").from("usernames").where("username","=",username)
}

function get(){
    return knex.select("*").from("usernames")
}

module.exports = {
    insert,
    remove,
    find,
    get
}