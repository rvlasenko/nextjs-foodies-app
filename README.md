# Next.js Meal Sharing Application

A Next.js application for exploring and sharing meals created by the community.

## Project Overview

Foodies is a web application that allows users to browse a collection of meals, view detailed recipes, and share their own favorite dishes with the community.

## Features

- **Browse Meals**: Explore a variety of meals shared by the community
- **Meal Details**: View comprehensive information about each meal
- **Share Recipes**: Add your favorite recipes to the collection
- **Community Section**: Connect with other food enthusiasts

## Installation

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

```sh
cp .env.example .env.local
```

4. Initialize the database:

```sh
node initdb.js
```

## Usage

### Development Server

```sh
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```sh
npm run build
npm start
```

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [SQLite](https://www.sqlite.org/) (via better-sqlite3) - Database
- [AWS S3](https://aws.amazon.com/s3/) - For image storage
- [React](https://reactjs.org/) - UI library
