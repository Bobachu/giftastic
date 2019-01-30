// pausing gifs activity
// button trigger activity
// an array of items
var videoGames = ["Final Fantasy", "Uncharted", "Destiny"];
// adds a button to the screen for each item
function createButtons() {
    $("#game-buttons").empty();
    for (var i = 0; i < videoGames.length; i++) {
        var gameButton = $("<button>");
        gameButton.addClass("game btn btn-info");
        gameButton.attr("data-name", videoGames[i]);
        gameButton.text(videoGames[i]);
        $("#game-buttons").append(gameButton);
    }
};

function gameGifs() {
    var gameName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gameName + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
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
// clicking the button contacts giphy to request related gifs (giphy api search)
//images of related gifs are displayed
// with their ratings
// clicking on a gif causes it to animate
// clicking again causes it to pause
// take the value from a form
// create a new button from it
// new button performs the same as the old button
