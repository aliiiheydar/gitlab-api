# gitlab-api
This small project is an api that first takes gitlab access token and then by another request take project id and return repository tree as json.
This app was created by node.js

# How to run
For running this app you need node and npm be installed on your machine.
First at the project directory run " npm install ".
After the modules are installed run " npm start ".
Now app is running on port 3000 and you can send requests.

# Hints

This app handles two request.

<base_url> is localhost:3000

First endpoint) 

url: <base_url>/token
method: POST
content-type: application/json
body:
{
  userId: string,
  gitlabAccessToken: string
}

This endpoint takes gitlabAccessToken and userId and stores in users list 

Second endpoint)

url: <base_url>/projects/:id/repository_tree
method: GET
headers: "userId:<userId>"

This endpoint takes userId in header and finds user in users list then send a request with token and project id to gitlab.
This endpoint send back repository tree.
