const express = require("express")
const axios = require("axios")

const app = express()

const port = 3000
app.use(express.json())

// defining an array for saving tokens
const users = []

// authentication endpoint (stores user gitlabAccessToken)
app.post("/token", (req, res) => {
    const newUser = req.body

    // checking that this user exist in users list
    const existingUserIndex = users.findIndex((user) => user.userId == newUser.userId)

    if (existingUserIndex !== -1) {
        // if user exists, updating it
        users[existingUserIndex].gitlabAccessToken = newUser.gitlabAccessToken
    } else {
        // if user does not exist, adding it to users list
        users.push(newUser)
    }

    res.status(200).send()
})

// repository tree endpoint
app.get("/projects/:id/repository_tree", (req, res) => {
    const userId = req.headers.userid
    const projectId = req.params.id

    // finding user gitlabAccessToken that recived with authentication request
    const userIndex = users.findIndex((user) => user.userId === userId)

    if (userIndex !== -1) {
        const user = users[userIndex]

        axios
            .get(
                `https://gitlab.com/api/v4/projects/${projectId}/repository/tree?private_token=${user.gitlabAccessToken}`
            )
            .then((result) => {
                // request succeed and result will be sent to client
                res.status(200).send(result.data)
            })
            .catch((err) => {
                // request failed because of wrong gitlabAccessToken or wrong projectId or network problem
                res.status(400).send()
            })
    } else {
        // request failed because user gitlabAccessToken does not exist
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
