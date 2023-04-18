# media-sharing

### Built With

* [![React][React.js]][React-url]
* [![Express][expressjs.com]][Express-url]
* [![MongoDB][mongodb.com]][MongoDB-url]
* [![Docker][docker.com]][Docker-url]
* [![Nginx][nginx.com]][Nginx-url]

### Running steps:
For production:

`docker compose up --build`

This will launch nginx as the http server for load-balancing. Served on port 80, the default exposed port for localhost.

For developement:

`docker compose -f docker-compose.dev.yml --build`

This will launch the react development server on port 3000.
