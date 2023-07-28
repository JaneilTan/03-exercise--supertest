const request = require("supertest");
const app = require("./app");
const pool = require("./db");

describe("Todos API", () => {
  afterEach(async () => {
    await pool.query("DELETE from todo");
  });

  afterAll(() => {
    pool.end();
  });

  test("GET /todos: WHEN there are todos in the database THEN return status 200 and an array of todos", async () => {
    await pool.query(`
      INSERT INTO
        todo (todo_id, description)
      VALUES
        (1, 'Start working on my project')  
    `);
    const expectedResponseBody = [
      {
        todo_id: 1,
        description: "Start working on my project",
      },
    ];
    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseBody);
  });

  test("GET /todos: WHEN there are no todos in the database THEN return status 200 and an empty array", async () => {
    const expectedResponseBody = [];
    const response = await request(app)
      .get("/api/todos")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseBody);
  });

  test("POST /todos: WHEN the client sends a well-formatted request THEN create a todo and return status 201 and the todo", async () => {
    const todoDescription = "More work on Project";

    const response = await request(app)
      .post("/api/todos")
      .send({ description: todoDescription });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({ description: todoDescription })
    );
  });

  test("GET /todos/:id: WHEN the client sends a request for an existing todo ID THEN return status 200 and the requested todo", async () => {
    const todoid = 2;
    await pool.query(`
      INSERT INTO
        todo (todo_id, description)
      VALUES
        (${todoid}, 'description')
    `);
    const expectedResponseBody = {
      todo_id: todoid,
      description: "description",
    };
    const response = await request(app)
      .get(`/api/todos/${todoid}`)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseBody);
  });

  test("GET /todos/:id: WHEN the client sends a request for a non-existent todo ID THEN return status 404", async() => {
    const nonExistentTodoId = 888888;
    const expectedResponseBody = {
      error: "Todo not found"
    }

    const response = await request(app)
      .get(`/api/todos/${nonExistentTodoId}`)
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expectedResponseBody);
  });
  

  test("PUT /todos/:id: WHEN the client sends a request to update an existing todo ID AND the request is well-formatted THEN return status 200 and the updated todo", async () => {
    const todoid = 1;
    
    const expectedResponseBody = {
      todo_id: todoid,
      description: "description",
    };
    const response = await request(app)
      .put(`/api/todos/${todoid}`)
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponseBody);
  });
  test("PUT /todos/:id: WHEN the client sends a request for a non-existent todo ID THEN return status 404", async () => {
    const nonExistentTodoId = 999999;
    const expectedResponseBody = {
      error: "Updated todo not found"
    }

    const response = await request(app)
      .put(`/api/todos/${nonExistentTodoId}`)
      .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expectedResponseBody);
  });
  


  test.todo("DELETE /todos/:id: WHEN ... THEN ...");
});
