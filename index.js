const { Client } = require("@notionhq/client")

var express = require('express')
var server = express()

server.get('/home', async function (request, response) {
    // console.log(request)
    console.log(request.query.page)

    const notion = new Client({
        auth: 'secret_lVlC1fCK8kVPwlJqaTZJM3QUSNAygUTtYddPpcRsxac',
    })
    try{
        const myPage = await notion.databases.query({
            database_id: "9c3c747d981540799c2c17aaf3af15b7",
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