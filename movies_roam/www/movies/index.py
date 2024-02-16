import frappe
import requests
from frappe import _

def get_movies(title, rating=None, year=None):
    url = "http://www.omdbapi.com/"
    params = {
        "apikey": "",
        "s": title
    }

    if rating:
        params["imdbRating"] = rating

    if year:
        params["y"] = year

    response = requests.get(url, params=params)
    data = response.json()

    if "Error" in data:
        frappe.msgprint(_("Error: {0}").format(data["Error"]))
        return []

    return data.get("Search", [])

@frappe.whitelist()
def search_movies(title, rating=None, year=None):
    movies = get_movies(title, rating, year)
    return movies

@frappe.whitelist()
def default_movies():
    # Provide defualt loading of movies for the first tim
    default_titles = ["The Matrix", "Inception", "Interstellar"]
    default_movies = []
    
    for title in default_titles:
        movies = get_movies(title)
        default_movies.extend(movies)
    
    return default_movies