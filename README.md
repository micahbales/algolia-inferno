# Algolia Inferno

The goal of this app is to:

- to architecture a small app using the Inferno front-end framework,
- to configure an Algolia index,
- and to build an application displaying an outstanding instant-search interface.

# Development Setup Guide

## Requirements

* Node.js 10
* MongoDB 4

## Installing Dependencies & Setting Up Databases

To install all dependencies, run:

```
npm run install-all
```

## Setting up API config

In the `api` directory:

```
cp .env.example .env
```

Open `.env` and replace the example secrets with your real project secrets.

# Loading Database Data and Syncing Algolia App Index

We want to have our database populated with the sample data, and to have that data mirrored in the Algolia App index.

In the `api` directory, run:

```
npm run data
```

These actions can be performed separately:

## Seeding the Database

```
npm run seed
```

## Syncing Algolia App Index with Database

```
npm run sync
```

# Run the Project Locally

After following the above steps, run the project locally by running `npm start` - first in the root directory, and then in a separate terminal window in the `client` directory.

# Deployment

This project is currently deployed to Heroku. You can see a live demo at:

https://algolia-inferno.herokuapp.com/
