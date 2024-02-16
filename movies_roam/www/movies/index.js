
frappe.ready(async() => {
    // Your JavaScript code here
    fetchDefaultMovies();
});

   async function fetchDefaultMovies() {
        await frappe.call({
            method: 'movies_roam.www.movies.index.default_movies',
            callback: function(r) {
                renderResults(r.message);
            }
        });
    }

    async function searchMovies() {
        var title = document.getElementById('movie_title').value;
        await frappe.call({
            method: 'movies_roam.www.movies.index.search_movies',
            args: {
                title: title,
            },
            callback: function(r) {
                renderResults(r.message);
            }
        });
    }

    function renderResults(movies) {
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        var row;
        movies.forEach((movie, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.className = 'row';
                resultsDiv.appendChild(row);
            }
            var movieDiv = document.createElement('div');
            console.log("movies", movie)
            movieDiv.className = 'col';
            movieDiv.innerHTML = '<div class="card">' +
                                 '<img class="card-img-top" src="' + movie.Poster + '" alt="' + movie.Title + '">' +
                                 '<div class="card-body">' +
                                 '<h5 class="card-title">' + movie.Title + '</h5>' +
                                 '<p class="card-text">Year: ' + movie.Year + '</p>' +
                                 '<p class="card-text">Type: ' + movie.Type + '</p>' +
                                 '</div>' +
                                 '</div>';
            row.appendChild(movieDiv);
        });
    }
