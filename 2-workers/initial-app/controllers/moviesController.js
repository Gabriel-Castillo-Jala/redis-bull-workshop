class MovieController {
    async getStatus(req, res) {
        const start = new Date();

        await new Promise(resolve => {
            setTimeout(() => {
                resolve({data: 1});
            }, 1000);
        });

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`Hello World in ${new Date() - start}ms`);
        res.end();
    }

    async getMovie(req, res) {

    }
}

module.exports = MovieController;
