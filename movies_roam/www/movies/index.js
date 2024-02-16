frappe.ready(async () => {
    // Your JavaScript code here
    fetchDefaultMovies();
});

async function fetchDefaultMovies() {
    await frappe.call({
        method: 'movies_roam.www.movies.index.default_movies',
        callback: function (r) {
            renderResults(r.message);
        }
    });
}

async function searchMovies() {
    var title = document.getElementById('movie_title').value;
    try {
        const response = await frappe.call({
            method: 'movies_roam.www.movies.index.search_movies',
            args: {
                title: title,
            }
        });
        if (response.message.error) {
            throw new Error(`API error: ${response.message.error}`);
        } else {
            renderResults(response.message);
        }
    } catch (error) {
        console.error("Error searching movies:", error);
        renderResults([]); // Render empty results to indicate an error
    }
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    await searchMovies(); // Call the searchMovies function
}

function renderResults(movies) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        var row;
        movies.forEach((movie, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.className = 'row';
                resultsDiv.appendChild(row);
            }
            var movieDiv = document.createElement('div');
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
    } catch (error) {
        console.error("Error rendering results:", error);
        resultsDiv.innerHTML = "<p>An error occurred while displaying movies. Please try again later.</p>";
    }
}

// Attach event listener to the form for submission
document.getElementById('customer-form').addEventListener('submit', handleFormSubmit);
