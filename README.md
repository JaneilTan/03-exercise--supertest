# 03 Exercise - SuperTest

Practise writing testing using [SuperTest](https://github.com/visionmedia/supertest).

## Brief

Your team has just implemented the Todos API. Your tech lead has asked you to write tests for the API using the test plan you created:

- GET /todos:
  - WHEN there are todos in the database THEN return status 200 and an array of todos
  - WHEN there are no todos in the database THEN return status 200 and an empty array
- POST /todos:
  - WHEN the client sends a well-formatted request THEN create a todo and return status 201 and the todo
- GET /todos/:id:
  - WHEN the client sends a request for an existing todo ID THEN return status 200 and the requested todo
  - WHEN the client sends a request for a non-existent todo ID THEN return status 404
- PUT /todos/:id:
  - WHEN the client sends a request to update an existing todo ID AND the request is well-formatted THEN return status 200 and the updated todo
  - WHEN the client sends a request for a non-existent todo ID THEN return status 404
  - WHEN the client sends a request to update an existing todo ID AND the request is NOT well-formatted THEN return status 400 and an error message
- DELETE /todos/:id:
  - WHEN the client sends a request to delete an existing todo ID THEN delete the todo and return status 200
  - WHEN the client sends a request to delete a non-existing todo ID THEN return status 404

## Getting Started

To build and run the server-side tests:

```zsh
docker-compose -f docker-compose.test.yml up --build
```

## Instructions

Implement the test in `server/app.test.js`.
Update the `server/app.js` as needed.

**Acceptance Criteria:**

- [ ] The tests in `server/app.test.js` have been implemented.
- [ ] The tests pass.
- [ ] The exercise has been submitted in Google Classroom.
