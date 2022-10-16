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
                        comment_count: expect.any(Number)
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
                votes: 1,
                comment_count: 0,
            })
         })
    })
    test("400 responds with an error when invalid id", () => {
        return request(app)
            .get("/api/reviews/invalidId")
            .expect(400)
            .then(( {body: { message } }) => {
                expect(message).toBe("Bad Request")
            })
    })
    test("404 responds with an error when id doesn't exist in database", () => {
        return request(app)
            .get("/api/reviews/9999")
            .expect(404)
            .then(( { body }) => {
                expect(body.message).toBe("Review 9999 Not Found")
            })
    })
    test("200 responds with a review object when provided a review id and includes a comment count", () => {
        return request(app)
            .get("/api/reviews/3")
            .expect(200)
            .then(( { body: {review}}) => {
                expect(review).toEqual({
                    review_id: 3,
                    title: 'Ultimate Werewolf',
                    category: 'social deduction',
                    designer: 'Akihisa Okui',
                    owner: 'bainesface',
                    review_body: "We couldn't find the werewolf!",
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 5,
                    comment_count: 3
                  })
            })
        })

})

describe('GET /api/reviews?queries', () => {
    test("200 responds with array of reviews when passed no query", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then(({ body: reviews }) => {
                expect(reviews).toHaveLength(13);

                reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            designer: expect.any(String),
                            comment_count: expect.any(Number)
                        })
                    )
                })
            })
    })
    test("200 responds with an array of review objects sorted by date when passed no query", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then(({ body: reviews}) => {
            const sortReviews = reviews.map((review) => {
                return { ... review };
            });

            const compareDates = (a,b) => {
                if(a.created_at > b.created_at){
                    return -1;
                }
                else if(a.created_at < b.created_at) {
                    return 1;
                }
                else {return 0}
                }
                sortReviews.sort(compareDates);
                expect(reviews).toEqual(sortReviews);
            })
    })
    test("200 successfully responds when passed category query", () => {
        return request(app)
            .get("/api/reviews?category=dexterity")
            .expect(200)
            .then(({ body: reviews}) => {

            expect(reviews).toEqual([
                {
                    review_id: 2,
                    title: 'Jenga',
                    category: 'dexterity',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_body: 'Fiddly fun for all the family',
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 5,
                    comment_count: 3
                  }
            ])

        })
    })
    test("200 responds with empty array when passed category query with no games", () => {
        return request(app)
            .get("/api/reviews?category=children's games")
            .expect(200)
            .then(({ body: reviews}) => {
                console.log(reviews);
            expect(reviews).toEqual([])
        })
    })
    test("404 returns error when passed invalid query", () => {
        return request(app)
            .get("/api/reviews?category=incorrectCategory")
            .expect(404)
            .then(({ body: {message}}) => {
                expect(message).toBe("Category Not Found");
            })
    })
})


describe("Complete Error Handling", () => {
    test("404 responds with error when endpoint does not exist", () => {
        return request(app)
            .get('/api/notfound')
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('Invalid Route')
        })
    })
})

describe("GET /api/users", () => {
    test("200 responds with an array of user objects", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then(({ body : users }) => {
                expect(users).toHaveLength(4);

                users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String)
                        })
                    )
                })
            })
    })
})

describe("PATCH /api/reviews/:review_id", () => {
    test("200 responds with an updated object when vote increased", () => {
        const increaseVotes = {
            inc_votes: 1,
        }

        return request(app)
            .patch("/api/reviews/2")
            .send(increaseVotes)
            .expect(200)
            .then(({ body: {review} }) => {
                expect(review).toEqual({
                    review_id: 2,
                    title: 'Jenga',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_img_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: 'Fiddly fun for all the family',
                    category: 'dexterity',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 6
                })
            })

    })
    test("200 responds with an updated object when vote decreased", () => {
        const decreaseVotes = {
            inc_votes: -1,
        }
        return request(app)
            .patch("/api/reviews/2")
            .send(decreaseVotes)
            .expect(200)
            .then(({ body: {review} }) => {
                expect(review).toEqual({
                    review_id: 2,
                    title: 'Jenga',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_img_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: 'Fiddly fun for all the family',
                    category: 'dexterity',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 4
                })
            })

    })
    test("400 responds with an error when incorrect key value", () => {
        const increaseVotes = {
            inc_votes: 'two',
        }

        return request(app)
            .patch("/api/reviews/2")
            .send(increaseVotes)
            .expect(400)
            .then(({ body: {message} }) => {
                expect(message).toBe("Bad Request")
                
                })
            })
    
        test("404 responds with error when passed invalidID", () => {
            const increaseVotes = {
                inc_votes: 1,
            }
    
            return request(app)
                .patch("/api/reviews/999")
                .send(increaseVotes)
                .expect(404)
                .then(({ body: { message } }) => {
                    expect(message).toBe('Review 999 Not Found')
                })
            })
            test("400 responds with error when passed no number id", () => {
                const increaseVotes = {
                    inc_votes: 1,
                }
        
                return request(app)
                    .patch("/api/reviews/notanid")
                    .send(increaseVotes)
                    .expect(400)
                    .then(({ body: { message } }) => {
                        expect(message).toBe('Bad Request')
                    })
                })
        
    })

describe("POST /api/reviews/review_id/comments", () => {
    test("201 reponds with an object that is a posted comment to database", () => {
        const postComment = {
            username: "mallionaire",
            body: "What a great game!"
        };
        return request(app)
            .post("/api/reviews/1/comments")
            .send(postComment)
            .expect(201)
            .then(({ body : {comment}}) => {
                expect(comment).toEqual({
                    comment_id: 7,
                    author: "mallionaire",
                    body: "What a great game!",
                    votes: 0,
                    review_id: 1,
                    created_at: expect.any(String)
                })
            })
        })
    test("400 responds with an error when invalid id", () => {
        const postComment = {
            username: "mallionaire",
            body: "What a great game!"
        };
        return request(app)
            .post("/api/reviews/invalidId/comments")
            .send(postComment)
            .expect(400)
            .then(({body: {message}}) => {
                expect(message).toBe("Bad Request")
            })
    })
    test("404 responds with error when given a username that does not exist", () => {
        const postComment = {
            username: "notausername",
            body: "What a great game!"
        };
        return request(app)
            .post("/api/reviews/1/comments")
            .send(postComment)
            .expect(404)
            .then(({body: {message}}) => {
                expect(message).toBe("Not Found")
            })
    })
    test("404 responds with error when passed an id that does not exist", () => {
        const postComment = {
            username: "mallionaire",
            body: "What a great game!"
        };
        return request(app)
            .post("/api/reviews/999/comments")
            .send(postComment)
            .expect(404)
            .then(({body: {message}}) => {
                expect(message).toBe("Not Found")
            })
    })
})
