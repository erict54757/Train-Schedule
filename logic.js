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
    // console.log(userInfo);

    database.ref().push(userInfo);

});

database.ref().on("child_added", function(snapshot) {
var fd = snapshot.val();
var newRow = $("<tr class = 'text-center'>")
var nameTd= $("<td class= 'd-inine-flex justify-content-center text-center'>").text(fd.name);
var destinationTd = $("<td class= 'd-inine-flex justify-content-center text-center'>").text(fd.destination);
var frequencyTd = $("<td class= 'd-inine-flex justify-content-center text-center'>").text(fd.frequency);
var timeFormat = "HH:mm";
var firstTime = moment(fd.time).format(timeFormat);
// console.log (fd.time);
var frequency= parseInt(fd.frequency);

// var nextArrival = parseInt(fd.frequency)+parseInt(fd.time);
// console.log(nextArrival)


// Time is 3:30 AM


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
// console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


var nextArrival = $("<td class= 'd-inine-flex justify-content-center text-center'>").text(moment(nextTrain).format("hh:mm"));
var minutesAway = $("<td class= 'd-inine-flex justify-content-center text-center'>").text(tMinutesTillTrain)

newRow.append(nameTd, destinationTd, frequencyTd, nextArrival, minutesAway);
$("#table-body").append(newRow);










});

