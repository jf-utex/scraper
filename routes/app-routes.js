module.exports = function(app) {
  // Retrieve data from the db
  app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error// If there are no errors, send the data to the browser as json
        );
      } else {
        res.json(found);
      }
    });
  });

  // Scrape data from one site and place it into the mongodb db
  app.get("/scrape", function(req, res) {
    // Make a request for the news section of ycombinator
    request("https://www.flexjobs.com/?utm_campaign=website&utm_source=sendgrid.com&utm_medium=email", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $("body > div.container.container-bottom-content > div:nth-child(1) > div.col-md-6.your-benefits > p > strong").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element

        var result = {};

        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        var entry = new Article(resule);

        entry.save(function(err, doc) {
          if (err) {
            console.log(err// Or log the doc
            );
          } else {
            console.log(doc);
          }
        });

      });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });

  // This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newNote = new Note(req.body);

  // And save the new note the db
  newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
};
