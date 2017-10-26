//initial array of topics
  var topics = ["Football", "Basketball", "Baseball", "Soccer", "Swimming", "Fishing", "Race Car Driving"];

      //this gathers all of the information from the button
      function displaySportInfo() {

        //get the name of the sport from data-name in the button
        var sport = $(this).attr("data-name");
        //set the query url with a limit of 10
    var url =  "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=Ee7Bx9Y7RC3FrTlynHR75YRvLhazoZT2&limit=10";

        //ajax call to the giphy api
        $.ajax({
          url: url,
          method: "GET"
          }).done(function(feedback) {
          
          //get data from feedback in a variable          
          var results = feedback.data;

          //empty the the div that holds the gifs
          $("#gifView").empty();

            //read through my array of results on the button selected
            for (var i = 0; i < results.length; i++) {
              var gifsOnPage =  "<div class='col-xs-4'><img src='" + results[i].images.fixed_height_small_still.url + "'";
                  gifsOnPage += "data-still='" + results[i].images.fixed_height_small_still.url + "'";
                  gifsOnPage += "data-animate='" + results[i].images.fixed_height_small.url + "'";
                  gifsOnPage += "data-state='still' class='gif'><br>Rating: ";
                  gifsOnPage +=  results[i].rating + "</div>";
              //well, append the div/button/rating text to the div with the gifView id
              $("#gifView").append(gifsOnPage);
             };
              //display the buttons after they have all been built with what they need, old and new
              displayButtons();
            });
          }

      //this displays the buttons on screen
      function displayButtons() {

        //empty the current button display.  
        $("#buttons-view").empty();

        //run through my array of sports for old and new, add the stuff we need to them.
        for (var i = 0; i < topics.length; i++) {

          var a =  "<button class='sport btn-success myButton' data-name='";
              a += topics[i];
              a += "'>"
              a += topics[i];
              a += "</button>";
          //add the buttons to the div with buttons-view id
          $("#buttons-view").append(a);
        }
      }

      //so when someone clicks on the add-sport button, get the info and push that to my array.  
      $("#add-sport").on("click", function(event) {
        event.preventDefault();

        var newSport = $("#sport-input").val();

          //just make sure they enter something
          if ( newSport.length === 0) {
          alert("You need to enter a value in the sport, sport!")
          } else {

          //push to array
          topics.push(newSport);

          //display the buttons, old and new.  
          displayButtons();
        }
      });

      //when you click on an element with a class of sport, run displaySportInfo
      $(document).on("click", ".sport", displaySportInfo);

      //make sure my buttons are displayed when the page is loaded, don't wait for an event.  
      displayButtons();

      //when you click on the element with a .gif class, determinate if it's animated or not.
      $(document).on("click", ".gif", function() {

      //get the data-state value from the button, write it to state
      var state = $(this).attr("data-state");

      //if the state is still, change the src to the animated url and the data-state to animate
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      //or do the opposite
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    