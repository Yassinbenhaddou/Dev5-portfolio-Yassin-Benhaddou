# Space Ship Maker

A web app that generates a 3D space ship using basic 3D geometry and three.js.

## Installation

1. Clone the repository using Git: 
    `git clone https://github.com/Yassinbenhaddou/Dev5-portfolio-Yassin-Benhaddou.git`

2. Navigate to the project directory: 
    `cd Dev5-portfolio-Yassin-Benhaddou`

3. Build and start the app using Docker Compose: 
    `docker-compose up --build`

## Testing

To use the testing you will need to make some minor changes

1. Open the api docker file 
    `./images/api/Dockerfile`

2. At the last line modify the start by test
    `CMD ["npm",  "start"]` to >>> `CMD ["npm",  "test"]`

3. Restart the application using docker-compose up 
    `docker-compose up --build`

4. When you have finished don't forget to put back start instead of test
    `CMD ["npm",  "test"]` to >>> `CMD ["npm",  "start"]`


## Usage

Use the app by visiting `http://localhost:8080/` in your web browser.


## Examples



## Dependencies

- Docker

## License

This project is released under the MIT License.

## Contact

Yassin Benhaddou

Yassin.Benhaddou@student.ehb.be
