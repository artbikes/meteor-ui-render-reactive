Books = new Meteor.Collection('books');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Click to show the book:";
  };

  Template.hello.events({
    'click input': function (e, tmpl) {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined') {
        console.log("You pressed the button");
        tmpl.findAll(".wrapper").html('');
        UI.insert(UI.renderWithData(Template.books, {id: "njynTFMaHLjzgBsDM"}), tmpl.find(".wrapper"));
        UI.insert(UI.renderWithData(Template.booksNonReactive, Books.findOne({_id: "njynTFMaHLjzgBsDM"})), tmpl.find(".wrapper"));
      }
    }
  });

  Template.books.getBook = function (id) {
    return Books.findOne({_id: id});
  }

  Template.booksNonReactive.newBookName = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Books.find().count() === 0)
      Books.insert({
        "_id" : "njynTFMaHLjzgBsDM",
        "name" : "My Book 1"
    });
  });

  Books.allow({
    update: function (userId, doc, fields, modifier) {
      return true;
    }
  });
}
