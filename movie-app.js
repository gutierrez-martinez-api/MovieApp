"use strict";


$(document).ready(function () {
//  url for API
    const API_URL = 'https://sordid-psychedelic-nylon.glitch.me/movies'
   //must delete this and add the key on keys/js // const OMDB_API = 'http://www.omdbapi.com/?i=tt3896198&apikey=635169e7'
    let url = "http://www.omdbapi.com/?apikey=" + OMDB_API; // to use on search
    /** VARIABLES */
    let movieList = $('#movies')


// fadeout loading message, removing div to give space for movies


    $('#main').load("body", function () {
        $('#load-icon').hide(5000, function () {
            $('#div').remove();
            getAllMovies();// added function
        });
    });

//  getting all movies here
    let getAllMovies = () => {
        return fetch(API_URL)
            .then(resp => resp.json())
            .then(data => {
                // $('#load-icon').hide(5000);
                $('#div').remove();
                $("#add-Form").show();
                $('#movies').empty();
                // console.log(data);
                let output = " ";
                for (let property of data) {
                    // console.log(`Movie List:\nTitle: ${property.title}\nActors:${property.actors}\nYear: ${property.year}`);
                    // added div class cards/img property and buttons
                    $('#movies').append(`<div class="col-md-3 my-col cards card-inf2" >
                    <img class="posterImg" id="posterImg" contenteditable="true" type="file" src="${property.poster}">
                    <div  class="card-body card-inf">                  
                    <h4  class="editTitle" id="editTitle" contenteditable="true">${property.title}</h4>
                    <p  class="editYear" id="editYear" contenteditable="true">${property.year}</p>
                    <p  class="editActors" id="editActors" contenteditable="true">Cast: ${property.actors}</p>
                    <p  class="editGenre" id="editGenre" contenteditable="true">${property.genre}</p>
                    <p  class="editRating" id="editRating" contenteditable="true"> ${property.rating}</p>
                    <button type="submit" data-id=${property.id.toString()}  class="btn-md btn-primary editButton" >Edit Movie</button>
                    <button type="button" data-id=${property.id.toString()} class="btn-md btn-danger deleteButton" >Delete Movie</button>
                    </div>
                    </div>`)
                }

            })// function for edit and delete movies
            .then(function () {
                $('.deleteButton').click(function () {
                    let movieDataAttr = $(this).attr('data-value');
                    let deleteMovie = {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    };
                    let inputVal = $(this).data("id");
                    fetch(`https://sordid-psychedelic-nylon.glitch.me/movies/${inputVal}`, deleteMovie)
                        .then(getAllMovies)
                })
                // console.log('something got deleted?')
                //copied code from below - let newMovie- to give functionality to edit button

                $('.editButton').click(function () {
                    let editMovie = {
                        "title": $(this).parent(".card-inf").children(".editTitle").text(),
                        "poster": $(this).parent(".card-inf2").children(".editPoster").image(),
                        "year": $(this).parent(".card-inf").children(".editYear").text(),
                        "genre": $(this).parent(".card-inf").children(".editGenre").text(),
                        "rating": $(this).parent(".card-inf").children(".editRating").text(),
                        "actors": $(this).parent(".card-inf").children(".editActors").text()

                    }
                    let patchOPT = {
                        method: 'PATCH',
                        headers: {
                            'Conctent-Type': 'application/json',
                        },
                        body: JSON.stringify(editMovie)
                    };
                    //
                    let editInputVal =  $(this).data("id");
                    fetch(`https://sordid-psychedelic-nylon.glitch.me/movies/${editInputVal}`, patchOPT).then(getAllMovies)
                });
            })
            .catch(err => console.error("This is your err:", err));
    }
    setTimeout(getAllMovies, 4000);


//function to add movies to glitch DB
    $(document).ready(function() {
        setTimeout(function(){
            $("#add-form").show();
        },5000)

    });

//this is a comment//DELETE THIS COMMENT
    $('#save-button').click((e) => {
        e.preventDefault();
        let newMovie = {
            'title': $('#title').val(),
            'rating': $('#rating').val(),
            'poster': $("#poster").val(),
            'year': $('#year').val(),
            'genre': $('#genre').val(),
            'actors': $('#actors').val(),
        };
        const post = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        // console.log(newMovie);
        // console.log(newMovie.rating);
        // console.log(newMovie.year);
        return fetch(`${API_URL}`, post)
            .then(resp => resp.json())
            .then(getAllMovies)
    });

// // GET REQUEST BY ID
//     let getMovieById = (id) => {
//         return fetch(`${API_URL}/${id}`)
//             .then(resp => resp.json())
//             .then(data => {
//                 console.log("This is your single movie data: ", data);
//                 // console.log(`Console Logging\nTitle: ${data.title} \nDirector: ${data.director} \nActor(s): ${data.actors} \nYear: ${data.year}`);
//                 return `\nTitle: ${data.title} \nDirector: ${data.director} \nActor(s): ${data.actors} \nYear: ${data.year}`;
//             })
//             .catch(err => console.error("This is your err:", err))
//     }
//
//     getMovieById(3).then(data => console.log("This is your selected movie: ", data));



    /*USING OMDDB*/

    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        // console.log($('#searchText').val()); // test

        let searchText=($('#searchText').val());// input search
        let results = ""; //empty div to display movie info

        // AJAX METHOD//
        $.ajax({
            method:'GET',
            url: url + "&t=" + searchText,
            success: function (data){
                console.log(data);// to test
                results= `
          <div class="container-fluid ">
          <img style="float:left" class="img-thumbnail" width="400"height="400" src="${data.Poster}"/>
           </div>
           <br>
          <div class="mx-lg-2  container-fluid justify-content-center col-9">
          <h2>${data.Title}</h2>
          <p>${data.Year}</p>
          <p>${data.Actors}</p>
          <p>${data.Genre}</p>
          <p>${data.Rating}</p>
          <p>${data.Plot}</p>
          </div> 
          `;
                $("#results").append(results)

            }
        })


    });
    $('#searchForm ').on('submit' ,(e) => {
        e.preventDefault();
        let x = document.getElementById("main-div");
        let y = document.getElementById("results")
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    })/// still working on replace information when new input on search is typed





    //DELETE THE FOLLOWING:

//  new object variable
// //  will use once we start working on creating/adding new movies
//     let newMovie = {
//         id: 100,
//         actors: "",
//         director: "",
//         genre: "",
//         plot: "",
//         poster: "",
//         rating: "",
//         title: "",
//         year: ""
//     }

//  variable to create movie below
//  will incorporate user input into the request
//     let createMovie = () => {
//         let options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify()
//         }
//         return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error("This is your err: ", err));
//     }

    // $("#save-button").click(function (e) {
    //     e.preventDefault();
    //     const movieToAdd = {
    //         poster: $("#new-poster-url").val(),
    //         title: $("#new-movie").val(),
    //         rating: $('#new-rating').val(),
    //         genre: $('#new-genre').val(),
    //         actors: $('#new-actors').val(),
    //         director: $('#new-director').val(),
    //         year: $('#new-year').val(),
    //         plot: $('#new-plot').val()
    //     }
    //     //getMoviesFromOMBDAPI(movieToAdd)
    //     // addMovie(movieToAdd)
    //     // getAllMovies()
    //     $('#addMovieModal').modal('hide');
    // });

})