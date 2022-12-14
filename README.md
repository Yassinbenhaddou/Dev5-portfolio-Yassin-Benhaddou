# Space Ship Maker

A web app that generates a 3D space ship using basic 3D geometry and three.js.

You can create your own space ship in the space ship maker section by selecting 
the shapes and colors of each part.

Then in the space ships list part you can find the list of all space ships and 
you can modify or delete them!


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

To use the application wait for the frontend and the server to start then visit the url `http://localhost:8080/` in your web browser.


## Examples

Create a Space Ship

![Create](https://im5.ezgif.com/tmp/ezgif-5-2aa838b8a7.gif)
 
Update a Space Ship

![Update](https://im5.ezgif.com/tmp/ezgif-5-66d4dd04d4.gif)

Delete a Space Ship

![An example GIF](https://im5.ezgif.com/tmp/ezgif-5-66d4dd04d4.gif)
    

## Dependencies

- Docker

## License

This project is released under the MIT License.

## Contact

Yassin Benhaddou

Yassin.Benhaddou@student.ehb.be
