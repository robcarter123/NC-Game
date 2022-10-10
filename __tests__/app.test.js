const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");


afterAll(() => {
    db.end();
});

beforeEach(() => {
    return seed(data);
})

describe("GET /api/categories", () => {
	test("200 responds with array of category objects", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then(({ body: categories }) => {
                const catArr = categories;
                expect(catArr).toHaveLength(4);

                catArr.forEach((category) => {
                    expect(category).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String),
                    })
                )
            })
        })
    })
})

describe("404 no valid endpoint", () => {
    test("404 responds with message of no valid endpoint", () => {
        return request(app)
            .get("/api/categoories")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe("No Valid Endpoint")
            })
    })
})