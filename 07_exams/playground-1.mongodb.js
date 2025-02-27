/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);

db.getCollection('reviews').insertMany([
    {
        "_id": ObjectId("5f95a1d11a12b400001b75c0"),
        "product_name": "Smartphone",
        "brand": "Apple",
        "price": 800,
        "categories": [ "Electronics", "Smartphones" ],
        "reviews": [
           { "username": "user1", "rating": 4, "comment": "Great product!" },
           { "username": "user2", "rating": 5, "comment": "Excellent!" },
           { "username": "user3", "rating": 6, "comment": "Good but overpriced." }
        ]
     },
     {
        "_id": ObjectId("5f95a1d11a12b400001b75c1"),
        "product_name": "Smartphone",
        "brand": "Samsung",
        "price": 750,
        "categories": [ "Electronics", "Smartphones" ],
        "reviews": [
           { "username": "user1", "rating": 4, "comment": "Great product!" },
           { "username": "user2", "rating": 5, "comment": "Excellent!" },
           { "username": "user3", "rating": 5, "comment": "Good but overpriced." }
        ]
     }
    ]);

db.getCollection('reviews').aggregate([
    {
        $unwind: "$reviews"
    },
    {
        $group: {
            _id: "$brand",
            avgRating: { $avg: "$reviews.rating" }
        }
    },
    {
        "$match": {
            avgRating: { $gte: 4 }
        }
    },
    {
        "$project": {
            "brand": "$_id",
            "avgRating": "$avgRating",
            "_id": 0
        }
    }
]);


db.reviews.aggregate([ 
    { "$unwind": "$reviews" }, 
    { "$group": { 
            "_id": "$brand", 
            "avg_rating": { "$avg": "$reviews.rating" } 
        } 
    }, 
    { "$match": { 
            "avg_rating": { "$gte": 4 } 
        } 
    }, 
    { "$project": { 
        "brand": "$_id", 
        "avg_rating": "$avg_rating", 
        "_id": 0 
    } 
}] )

db.orders.aggregate([
    { $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "customer_id",
        as: "customer_info"
    }}
  ])

// inserts multiple documents into a MongoDB collection named orders 
// with the options to bypass document validation and continue processing even if an error occurs during insertion?

  db.orders.insertMany(
    [
      { item: "Keyboard", quantity: 10, price: 20.99 },
      { item: "Mouse", quantity: 5, price: 14.99 }
    ],
    { validate: false, continueOnError: true }
  )

