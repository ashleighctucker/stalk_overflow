# Welcome to the stalk_overflow! A clone of [Stack Overflow](https://stackoverflow.com) for plant lovers! 


Here is a link to the [live site](https://stalk-overflow.herokuapp.com)

Stalk Overflow is a clone of stack overflow with CRUD operations for questions and answers. It also includes upvotes and downvotes for questions and answers. Most of these features are only available when logged into the site, you can create an account and try it yourself [here](https://stalk-overflow.herokuapp.com/sign-up)!

![Preview](https://github.com/ashleighctucker/stalk_overflow/blob/main/images/overflow-preview.gif)



## Tech-Stack:

* ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
* Pug.js
* ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
* Sequelize
* Faker API



## Want to contribute to stalk overflow or try it out locally? Stalk overflow requires Postgres. 

1. Clone our repo with the command:  `gh repo clone ashleighctucker/stalk_overflow`
2. CD into the project directory and install dependencies with the command: `npm install`
3. Create a .env file with from the .env.example in the root of the project.
4. Create a user in Postgres with the username and password set in your .env file, with CREATEDB.
5. Create the database by running the command: `npx dotenv sequelize db:create`
6. Migrate the database by running the command: `npx dotenv sequelize db:migrate`
7. Seed the database by running the command: `npx dotenv sequelize db:seed:all` 
8. You can start the server by running `npm start` in your console, nodemon is installed as a dev dependency so that you can make live changes without restarting the server. Happy coding!



## Future Features for Stalk Overflow:
* A users page that shows current users, sorting by activity
* Comments on answers and questions(full crud)
* Adding question categories
* Searching by category/user
* MAJOR CSS mobile overhaul
