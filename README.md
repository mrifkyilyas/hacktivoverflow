# hacktivoverflow

simple clone of stackoverflow made using express, mongodb/mongoose and vue js

## List of user routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
user/register    | POST   | body(name:String, email:String, password:String) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/login       | POST   | body(email:String, password:String)       | On success a token will be generated in local                                                                   storage, an error will be shown if fail, example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

## List of question routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
question       | GET    | none                        | Returns all questions in the collection as an object which is also deeply populated (populates answers, user data in answers, and user data in question)
question        | POST   | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], answers:[ Answer ObjectId ], isAnswered:Boolean, tags:[ String(enum: ['javascript', 'html', 'css', 'mongoose', 'mongodb']) ], user:ObjectId, createdAt:Date) | On success a new question document will be created in the collection database and returned as a deeply populated object, an error will be returned if validation failed
question/:id  | GET    | none       | Returns detail question

## List of answer routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
answer        | POST   | header(access_token) body(title:String, description:String, upvotes:[ User ObjectId ], downvotes:[ User ObjectId ], question:ObjectId, isAccepted:Boolean, user:ObjectId, createdAt:Date) | On success a new answer document will be created in the collection database and returned as an object, an error will be returned if validation failed
