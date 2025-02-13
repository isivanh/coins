# ivan-hancco

To run this project, execute the following commands:

```
docker compose build
docker compose up
```
Then go to `http://localhost:3001/` and login with one of these users:

- user1@gmail.com
- user2@gmail.com
- user3@gmail.com

The password for all of these accounts is always `password`

## Considerations

1. The `.env` file was pushed so that you can decrypt the DB user passwords and test this challenge. In a real world production environment, the `.env` file should not be pushed to the git repo

2. The Dockerfile for the frontend is using a simple web server `serve` from the NPM library. One future improvement could be to use battle tested servers such as nginx.
