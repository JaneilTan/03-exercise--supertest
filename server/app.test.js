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

  test.todo("POST /todos: WHEN ... THEN ...");

  test.todo("GET /todos/:id: WHEN ... THEN ...");

  test.todo("PUT /todos/:id: WHEN ... THEN ...");

  test.todo("DELETE /todos/:id: WHEN ... THEN ...");
});
