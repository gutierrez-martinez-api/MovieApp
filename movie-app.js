"use strict";



$(document).ready(function () {
//  url for API
    const API_URL = 'https://sordid-psychedelic-nylon.glitch.me/movies'
//  we should be able to delete this
//     const serverURL = 'sordid-psychedelic-nylon';

/** VARIABLES */
let movieList = $('#movies')


//fadeout loading message, removing div to give space for movies
    $('#main').load("body", function(e) {
        $('#load-icon').fadeOut(5000, function() {
            $('#div').remove();
        });

    });


//  getting all movies here
    let getAllMovies = () => {
        return fetch(API_URL)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                for (let property of data) {
                    // console.log(`Movie List:\nTitle: ${property.title}\nActors:${property.actors}\nYear: ${property.year}`);
                    $('#movies').append(`<p>Title: ${property.title}</p><p>Actors: ${property.actors}</p>`)
                }
            })
            .catch(err => console.error("This is your err:", err));
    }
    getAllMovies();

// GET REQUEST BY ID
    let getMovieById = (id) => {
        return fetch(`${API_URL}/${id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log("This is your single movie data: ", data);
                // console.log(`Console Logging\nTitle: ${data.title} \nDirector: ${data.director} \nActor(s): ${data.actors} \nYear: ${data.year}`);
                return `\nTitle: ${data.title} \nDirector: ${data.director} \nActor(s): ${data.actors} \nYear: ${data.year}`;
            })
            .catch(err => console.error("This is your err:", err))
    }

    getMovieById(2).then(data => console.log("This is your selected movie: ", data));

//  new object variable
//  will use once we start working on creating/adding new movies
    let newMovie = {
        id: 100,
        actors: "",
        director: "",
        genre: "",
        plot: "",
        poster: "",
        rating: "",
        title: "",
        year: ""
    }

//  variable to create movie below
//  will incorporate user input into the request
    let createMovie = () => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }
        return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error("This is your err: ", err));
    }



})