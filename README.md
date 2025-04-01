# Godot Gql Test/Sample
This project is intended to test in real life the [GodotGraphQL](https://github.com/Dracks/GodotGraphQL) package.

Also it can be used as a sample of how to use the library.

## Usage:

Inside the server, you have an small typescript application that serves a small GraphQL server. To run it you will need to have node installed

### Runing the server:
1. Install dependencies inside the server folder:
```bash
npm install
```

2. Run the server (also inside the server folder)
```bash
npm run serve
```

### Runing the client:
Import it into godot.

1. Simply run it in godot.

## Features
1. A query with parameters
2. A subscription that starts out of the box and gets automatically updated from the server
