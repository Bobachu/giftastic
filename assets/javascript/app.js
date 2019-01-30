// An array to store inital games and add new games to
var videoGames = ["Final Fantasy", "Uncharted", "Destiny"];

// A function to create new buttons, function declared
function createButtons() {
    // clears the area of buttons before creating new ones
    $("#game-buttons").empty();
    // loops over the array...
    for (var i = 0; i < videoGames.length; i++) {
        // to create a button for each item...
        var gameButton = $("<button>");
        // and add the classes to use later (and also bootstrap)...
        gameButton.addClass("game btn btn-info");
        // and create an attribute called data-name with a value of the game name, to be used later...
        gameButton.attr("data-name", videoGames[i]);
        // and to add the game name as text on the buttons...
        gameButton.text(videoGames[i]);
        // and to add the buttons to the appointed area on the HTML
        $("#game-buttons").append(gameButton);
    }
};

// A function to retrieve the gifs using the giphy api...
function gameGifs() {
    // variables for game name using the data-name attribute set above...
    var gameName = $(this).attr("data-name");
    // and create a variable for the api url using the gameName variable
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gameName + "&api_key=dc6zaTOxFJmzC&limit=10";

    // An ajax call to the giphy api to request the gifs
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // setting a variable to store the resonse array
        var results = response.data;
        // console log the array (helps to get the needed paths)
        console.log(results);
        // a for loop to loop through the created array...
        for (var i = 0; i < results.length; i++) {
            // a variable to create a new div...
            var gifDiv = $("<div>");
            // a div to store the gif rating
            var rating = results[i].rating;
            // a variable to createa paragraph element and add the rating to it
            var p = $("<p>").text("Rating: " + rating);
            // adding a rating-text class to the paragraphs
            p.addClass("rating-text");
            
            var gameGif = $("<img>");
            gameGif.attr({
                "src": results[i].images.original_still.url,
                "still-url": results[i].images.original_still.url,
                "animate-url": results[i].images.original.url,
                "data-state": "still",
                "class": "game-gifs col"
            });

            gifDiv.prepend(gameGif);
            gifDiv.prepend(p);


            $("#gif-area").prepend(gifDiv);
        }
    });
}

function playPause() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("animate-url"));
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("data-state", "still");
    }

}

$("#more-games").on("click", function (event) {
    event.preventDefault();

    var game = $("#game-input").val().trim();

    if (game === "") {
        return;
    }

    videoGames.push(game);

    createButtons();
    $("#game-input").val("");
});

$(document).on("click", ".game", gameGifs);

$(document).on("click", ".game-gifs", playPause);

createButtons();
