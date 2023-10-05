# What is this Repo?

<p>This project is a mock news app intended to replicate a real world backend service. It is designed to have the fuctionality of such services, and to be interacted with in order to create, modify, view, or delete current data. Eventually, this will be interacted with through a GUI which will be created at a later date.</p>

## Take a look at the hosted version of the project:

<p> https://nc-news-nvy4.onrender.com/api

Currently, this will take you to a page detailing what endpoints are available, and what each endpoint will require/provide.

</p>

### Instructions on cloning and demo'ing:

- Copy the GitHub clone link (https://github.com/JordanEckford/nc-news.git)
- Navigate to the desired file location in your terminal and run
  > git clone [link]
- Navigate into the newly created folder and run

  > code .

  this will open the folder in VSCode, if another program is desired, manually open the folder up

- To install all of the dependencies required to run the files, run:

  > npm install

- To set up the Database, run

  > npm run setup-dbs

- To be able to run this locally, create the below files in the root directory of the project:

  > echo PGDATABASE=nc_news_test > .env.test && echo PGDATABASE=nc_news > .env.development

- To seed the local database, run:

  > npm run seed

### Testing

- To run tests:

  > 'npm test'

  nb. To run specific tests only, add a .only on the describe / test block (describe.only("...")) or (test.only("..."))

#### Minimum versions required:

<ul>
<li>Node.js : 20.3.0 </li>
<li>Postgres : 8.7.3 </li>
</ul>
