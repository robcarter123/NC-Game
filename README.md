# Northcoders House of Games API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Creating Environment Variables

Once you have cloned down to your local machine and have the folder open in VS Code, you want to create two new evnironment variables. You can do this by simply creating a new file, we want to create this in the primary folder and not inside any other folders. When the file is created, we want to name it '.env.' and then either '.test' or '.development', make sure you create a file for both.

Then we can add in PGDATABASE=database_name_here, adding whichever database necessary. Once we have created these two files and added the necessary database, we want to check that .env.\* is added to .gitignore so we're not pushing sensitive information.
