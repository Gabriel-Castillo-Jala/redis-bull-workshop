const { parentPort, workerData } = require('worker_threads');
const fetch = require('node-fetch');

const getMoviesWorker = async () => {
  const requests = [];

  for (let page = workerData.startPage; page <= workerData.endPage; page++) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${workerData.genres}`;
    requests.push(fetch(url, workerData.fetchOpts));
  }

  const results = await Promise.all(requests);

  const succeeded = [];
  for (const res of results) {
    if (res.ok) {
      succeeded.push(res.json());
    }
  }

  const jsonResponses = await Promise.all(succeeded);

  const movies = [];
  for (const jsonRes of jsonResponses) {
    movies.push(...jsonRes.results);
  }

  const mappedGenres = new Map(workerData.validGenres.map((genre) => [genre.id, genre.name.toLowerCase()]));

  for (const movie of movies) {
    const genreLabels = [];

    movie.genre_ids.forEach(id => {
      genreLabels.push(mappedGenres.get(id));
    });

    movie.genreLabels = genreLabels;
    delete movie.genre_ids;

    await new Promise((resolve) => {
      setTimeout(resolve, 1);
    });
  }

  return movies;
}

getMoviesWorker()
  .then((fetched) => {
    parentPort.postMessage(fetched);
  })
  .catch((err) => {
    throw err;
  });
