const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f1ba246b4de882b3dc1d7fa5749b3f48&language=en-US&page=1`; // place your API key in the api_key= <apikey>
const IMGPATH = "https://image.tmdb.org/t/p/w1280/" // This is the default Image path shown by the API call


const movies = document.querySelector("#movies")
async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json(); // Converting fetched data to json
    console.log(respData)
    respData.results.forEach((movie) => {

        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie"); // Adding the movie class to each element of movie created

        movieEl.innerHTML = `
            <img
                src = "${IMGPATH + poster_path}"
                alt = ${title}
            />
            <div class = "movie-info">
                <h3>${title}</h3>
                <span class="${colorRating(vote_average)}">${vote_average}</span>
            </div>
            <div class = "overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        movies.appendChild(movieEl) // Appending the elements onto the movies which is a id on the html page
    })


}

function colorRating(rating) {
    if (rating >= 8) return "green"; // If rating > 8 then green
    else if (rating < 8 && rating >= 5) return "orange"; // If rating < 8 and rating >= 5 then green
    else return "red"; // Any other option
}

getMovies() // Calling the API
