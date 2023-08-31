# Skill-Test-Project-ApiPolling



How to Interact with the API

To interact with the API, you can use Postman, a widely-used tool for testing and interacting with APIs. Follow these steps to make requests using Postman:

Install Postman:If you haven't already, download and install the Postman application from the Postman website.

1.Create a Question:
        Method: POST
        URL: localhost:8000/question/create
        In the body, provide a key "title" and a value for the question.
        Click "Send" to create a new question.

2.Delete a Question:
        Method: GET
        URL: localhost:8000/question/:id/delete
        Replace :id with the actual ID of the question you want to delete.
        Click "Send" to delete the specified question.

3.Create an Option for a Question:
        Method: POST
        URL: localhost:8000/question/:id/options/create
        Replace :id with the actual ID of the question.
        In the body, provide a key "text" and a value for the option.
        Click "Send" to add an option to the specified question.

4.Show a Full Question with Options:
        Method: GET
        URL: localhost:8000/question/:id
        Replace :id with the actual ID of the question.
        Click "Send" to retrieve the specified question along with its options.

5.Delete a Specific Option:
        Method: GET
        URL: localhost:8000/option/:id/delete
        Replace :id with the actual ID of the option you want to delete.
        Click "Send" to delete the specified option.

6.Add a Vote to an Option:
        Method: POST
        URL: localhost:8000/option/:id/add_vote
        Replace :id with the actual ID of the option.
        Click "Send" to add a vote to the specified option.


