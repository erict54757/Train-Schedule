  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_KJ5aQ2dR_qNf6zPInQxGiQKxpwSKI2Y",
    authDomain: "monster-database.firebaseapp.com",
    databaseURL: "https://monster-database.firebaseio.com",
    projectId: "monster-database",
    storageBucket: "monster-database.appspot.com",
    messagingSenderId: "10551285518"
  };
  firebase.initializeApp(config);


var database = firebase.database();

$("#submitButton").on("click", function () {
    event.preventDefault();

    var name = $("#trainName").val();
    var destination = $("#destination").val();
    var military = $("#militaryTime").val();
    var frequency = $("#frequency").val();

    var userInfo =
    {
        name: name,
        destination: destination,
        time: military,
        frequency: frequency
    }
    console.log(userInfo);

    database.ref().push(userInfo);

});

database.ref().on("child_added", function(snapshot) {
var fd = snapshot.val();
var newRow = $("<tr>")
var nameTd= $("<td>").text(fd.name);
var destinationTd = $("<td>").text(fd.destination);
var timeTd = $("<td>").text(fd.time);
var frequencyTd = $("<td>").text(fd.frequency);
console.log(fd.time);


newRow.append(nameTd, destinationTd, timeTd, frequencyTd);
$("#table-body").append(newRow);










});

