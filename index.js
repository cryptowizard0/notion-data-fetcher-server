const { Client } = require("@notionhq/client")
const dotenv = require('dotenv').config()

var express = require('express')
var server = express()

server.get('/drama', async function (request, response) {
    console.log(request)
    const notion = new Client({
        auth: process.env.NOTION_TOKEN_DRAMA,
    })
    try{
        const myPage = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID_DRAMA,
            filter: {
                property: "Score",
                number: {
                    greater_than: 1
                }
            },
            sorts: [
                {
                    property: "Date",
                    direction: "descending"
                }
            ]
        }) 
        response.send(myPage)
    }catch (error) {
        console.error(error)
    }  
})

server.listen(4040)
console.log('start at 4040')