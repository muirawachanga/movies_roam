import pytest
from frappe.frappeclient import FrappeClient
from frappe.utils import get_request_site_address
import frappe

API_KEY = frappe.conf.get("omd_api")  # Replace with your actual API key

@pytest.fixture(scope="module")
def frappe_client():
    client = FrappeClient(get_request_site_address(), "Administrator", "admin")
    client.make_request("frappe.core.doctype.system_settings.system_settings.set_value", {
        "key": "omd_api",
        "value": API_KEY
    })
    yield client

def test_get_movies(frappe_client):
    movies = frappe_client.call("movies_roam.www.movies.index.get_movies", {
        "title": "The Matrix"
    })
    assert len(movies) > 0
    assert movies[0]["Title"] == "The Matrix"

def test_search_movies(frappe_client):
    movies = frappe_client.call("movies_roam.www.movies.index.search_movies", {
        "title": "Inception",
        "rating": "8.0"
    })
    assert len(movies) > 0
    assert movies[0]["Title"] == "Inception"
    assert movies[0]["imdbRating"] == "8.8"

def test_default_movies(frappe_client):
    movies = frappe_client.call("movies_roam.www.movies.index.default_movies")
    assert len(movies) == 3
    assert set([movie["Title"] for movie in movies]) == set(["The Matrix", "Inception", "Interstellar"])
