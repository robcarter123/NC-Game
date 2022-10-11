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

describe("GET /api/reviews/:review_id", () => {
    test("200 responds with a review object containing the correct information ", () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then(({ body: {review} }) => {
                expect(review).toEqual(
                    expect.objectContaining({
                        review_id: 1,
                        title: expect.any(String),
                        review_body: expect.any(String),
                        designer: expect.any(String),
                        review_img_url: expect.any(String),
                        votes: expect.any(Number),
                        category: expect.any(String),
                        created_at: expect.any(String),
                    })
                )
            expect(review).toEqual({
                review_id: 1,
                title: 'Agricola',
                designer: 'Uwe Rosenberg',
                owner: 'mallionaire',
                review_img_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                review_body: 'Farmyard fun!',
                category: 'euro game',
                created_at: "2021-01-18T10:00:20.514Z",
                votes: 1  
            })
         })
    })
    test("400 responds with an error when invalid id", () => {
        return request(app)
            .get("/api/reviews/invalidId")
            .expect(400)
            .then(( {body: { message } }) => {
                expect(message).toBe("Invalid Request")
            })
    })
    test("404 responds with an error when id doesn't exist in database", () => {
        return request(app)
            .get("/api/reviews/9999")
            .expect(404)
            .then(( { body }) => {
                console.log(body)
                expect(body.message).toBe("Review 9999 Not Found")
            })
    })
})

describe("Complete Error Handling", () => {
    test("404 responds with error when endpoint does not exist", () => {
        return request(app)
            .get('/api/notfound')
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('No Valid Endpoint')
        })
    })
})