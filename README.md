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

## Setting up API config:

In the `api` directory:

```
cp .env.example .env
```

Open `.env` and replace the example secrets with your real project secrets.

# Loading Database Data

In the `api` directory:

```
npm run seed
```

Run this any time you need to load or reset the data in the database.
