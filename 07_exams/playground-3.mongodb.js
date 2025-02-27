/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('sample_supplies');

// Search for documents in the current collection
db.sales.findOne({});

// You need to find all students who are either enrolled, over 21 years old, and have a GPA of at least 3.0, or students who are not enrolled and majoring in "Computer Science." Which of the following queries would correctly find the matching documents?

// Correct answer
db.students.find({ 
    $or: [
        { $and: [ { enrolled: true }, { age: { $gt: 21 }, gpa: { $gte: 3.0 } } ] },
        { $and: [ { enrolled: false }, { major: "Computer Science" } ] }
    ]
})

db.
{
    "_id": ObjectId("5f95a1d11a12b400001b75c1"),
    "product_name": "Smartphone",
    "brand": "Samsung",
    "price": 750,
    "categories": [ "Electronics", "Smartphones" ],
    "reviews": [
       { "username": "user1", "rating": 5, "comment": "Great product!" },
       { "username": "user2", "rating": 5, "comment": "Excellent!" },
       { "username": "user3", "rating": 4, "comment": "Good but overpriced." }
    ]
 }


 [
    {
       "$unwind": "$reviews"
    },
    {
       "$group": {
          "_id": "$brand",
          "avg_rating": { "$avg": "$reviews.rating" }
       }
    },
    {
       "$match": {
          "avg_rating": { "$gte": 4 }
       }
    },
    {
       "$project": {
          "brand": "$_id",
          "avg_rating": "$avg_rating",
          "_id": 0
       }
    }

    