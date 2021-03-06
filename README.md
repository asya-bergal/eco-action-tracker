# eco-action-tracker

[Eco-action-tracker](http://52.90.78.114/) is a webapp that gamifies environmental consciousness. It allows students to track their environmental actions over time to get points, join groups, and compete with other students.

## License

[The code](https://github.com/asya-bergal/eco-action-tracker) is distributed as [free software](https://www.fsf.org/about/what-is-free-software) under the [MIT License](https://opensource.org/licenses/MIT). However, the site contains trademarked materials (e.g. images) owned by Change is Simple, Inc.

## Code Structure

We follow a [standard Meteor boilerplate structure](https://github.com/matteodem/meteor-boilerplate).

Here is an outline of some of the more important parts of our code, ordered roughly from backend to frontend.

`collections/` 

Schemas for the Mongo databases that we use, `actions`, `competitions`, `groups`, and `users`. The schemas specify the structure of our database documents.

`server/methods/`

Several .js files that contain all the backend methods we use to do operations on our databases, e.g. `takeAction`, `getUserPoints`, etc.

`server/publications/`

Code that specifies which parts of the database we publish to the client.

`routes/`

Code that specifies how different URL paths are routed on the server. Note that in Meteor, most of the client-server interaction happens through publish/subscribe and `Meteor.call` calls to backend methods, not routes.

`client/startup/`

Code that specifies which parts of the database from the server the client subscribes to.

`client/views/`

This folder contains several other folders, each roughly corresponding to a single Spacebars template and its corresponding .js code. `client/views/userViews` contains a large body of code corresponding to user-specific pages, such as `history/` and `profile/`.

`client/stylesheets`

.less CSS files that specify the styling of all our HTML pages.

Code is further documented with normal comments and JSDoc comments, which are built in `.jsdoc`.

## Development Instructions

This project was creating using the [Meteor](https://www.meteor.com/) framework. In order to deploy a development version of this application please run the following in a terminal:

```
meteor 
```

This will create a local version of the app running at localhost:3000.


## Deploying This Application

For how to deploy this application please refer to this [article](http://sergelobatch.com/slog/2015/4/10/using-mup/), but currently use mupx rather than mup.

In order to create a temporary deployment you can type the following into a terminal:

```
meteor name.meteor.com
```
