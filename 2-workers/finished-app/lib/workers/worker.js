const { parentPort, workerData } = require('worker_threads');
const fetch = require('node-fetch');
const { result } = require('lodash');


const performTask = async (start, end, opts) => {
  const requests = [];

  for (let page = start; page <= end; page++) {
    // console.info('page', i);
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${opts.joinedGenres}`;
    requests.push(fetch(url, opts.fetchOpts));
  }
  const results = await Promise.all(requests);
  const succeeded = [];
  for (const res of results) {
    if (res.ok) {
      succeeded.push(res.json());
    }
  }
  const jsonResponses = await Promise.all(succeeded);
  console.info(`Worker........start: ${start}, end: ${end}`);

    const movies = [];
    for (const jsonRes of jsonResponses) {
      movies.push(...jsonRes.results);
    }

    return movies;
}

try {
  const { start, end, opts } = workerData;
  performTask(start, end, opts)
  .then((resolvedResults) => {
    parentPort.postMessage(resolvedResults);
  })
  .catch((error) => {
    parentPort.postMessage({ error: error.message });
  });
} catch (error) {
  console.error(error);
}
