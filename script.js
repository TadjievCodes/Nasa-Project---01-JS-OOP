// GLobal Array of NASA data. It will be populated after retrieving the JSON data accordingly
let nasaArray = [];

function nasaConstruct(date, explanation, hdurl, media_type, service_version, title, url) {
    this.date = date;
    this.explanation = explanation;
    this.hdurl = hdurl;
    this.media_type = media_type;
    this.service_version = service_version;
    this.title = title;
    this.url = url;
}
// Set the names of the Constructor function as in the JSON data as by the order of names as well

//Index used in navigation button function
var navindex = 0;


/* ***AJAX ASYNCHRONOUS XMLHTTPREQUEST***  */


function getJSONAsync(url) {
    var response;
    var xmlHttp;
    response = "";
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp !== null) {
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        response = xmlHttp.responseText;
    }

    return response;
}

function getNasaDataAsynch() {
    var month = document.getElementById("monthDrop").value;
    var day = document.getElementById("dayDrop").value;
    var year = document.getElementById("yearDrop").value;

    if (month == 0 || day == 0 || year == 0) {
        window.alert("Select a valid date and try again please...");
    } else {

        var tempUrl = "https://api.nasa.gov/planetary/apod?api_key=tahQITZb6AOsbD2e9F8S3BC82ULVNCZ7Mg0scUhU";

        var nasaJSON = getJSONAsync(tempUrl);

        var jsonObject = JSON.parse(nasaJSON);

        nasaArray = [];

        //Populating our global array with JSON data

        for (var propname in jsonObject.data.title) {

            for (var i = 0; i < jsonObject.data.length; i++) {

                let tempItem = jsonObject[i];
                // (date, explanation, hdurl, media_type, service_version, title, url)
                nasaArray.push(new nasaConstruct(jsonObject.data.tempItem.date,
                    jsonObject.data.tempItem.explanation,
                    jsonObject.data.tempItem.hdurl,
                    jsonObject.data.tempItem.media_type,
                    jsonObject.data.tempItem.service_version,
                    jsonObject.data.tempItem.title,
                    jsonObject.data.tempItem.url));

            } // end of inner loop
        } // end of for loop propname

        //Filling text boxes
        fillTextBoxes(nasaArray, 0);
    }
}

/*
    THIS FUNCTION FILLS THE TEXT BOXES WITH THE OBJECT DATA
*/
function fillTextBoxes(object, index) {
    if (gamesArray.length > 0) {
        document.getElementById("homeTeamName").value = object[index].homeCity;
        document.getElementById("awayTeamName").value = object[index].awayCity;
        document.getElementById("winningPitcher").value = object[index].winningPitcherFirst + " " + object[index].winningPitcherLast;
        document.getElementById("losingPitcher").value = object[index].losingPitcherFirst + " " + object[index].losingPitcherLast;
        document.getElementById("venue").value = object[index].venue;

        //Enables buttons
        document.getElementById("previousGame").disabled = false;
        document.getElementById("nextGame").disabled = false;
    } else {
        document.getElementById("homeTeamName").value = "";
        document.getElementById("awayTeamName").value = "";
        document.getElementById("winningPitcher").value = "";
        document.getElementById("losingPitcher").value = "";
        document.getElementById("venue").value = "";

        window.alert("No games on this date...");

        //Disable buttons
        document.getElementById("previousGame").disabled = true;
        document.getElementById("nextGame").disabled = true;
    }
}

/*
    THIS FUNCTION FILLS THE TEXT BOXES ACCORDING TO THE BUTTON
*/
function navButtons(btn) {
    var lastGame = gamesArray.length;

    //Previous button
    if (btn == "prev") {
        if (navindex == 0) {
            window.alert("This is the first game of the day...");
        } else {
            navindex--;
            fillTextBoxes(gamesArray, navindex);
        }
    }
    //Next button
    else {
        if (navindex >= (gamesArray.length - 1)) {
            window.alert("This is the last game of the day...");
        } else {
            navindex++;
            fillTextBoxes(gamesArray, navindex);
        }
    }
}

/*
    POPULATING DROPDOWNS FUNCTIONS
*/
function startUp() {
    populateDropDownMenu("monthDrop", 1, 12);
    populateDropDownMenu("dayDrop", 1, 31);
    populateDropDownMenu("yearDrop", 2015, 2017);
}

function populateDropDownMenu(elementId, min, max) {
    var dropDown = document.getElementById(elementId);

    //Loop from min to max
    for (var counter = min; counter <= max; counter++) {
        var tempElement = document.createElement("option");

        if (elementId == "monthDrop") {
            tempElement.innerHTML = getMonthName(counter);
            if (counter <= 9) {
                tempElement.value = "0" + counter;
            } else {
                tempElement.value = counter;
            }
        } else {

            tempElement.innerHTML = counter;
            tempElement.value = counter;
        }
        dropDown.appendChild(tempElement);
    }
}

function getMonthName(month) {
    if (month == 1) {
        return "January";
    } else if (month == 2) {
        return "February";
    } else if (month == 3) {
        return "March";
    } else if (month == 4) {
        return "April";
    } else if (month == 5) {
        return "May";
    } else if (month == 6) {
        return "June";
    } else if (month == 7) {
        return "July";
    } else if (month == 8) {
        return "August";
    } else if (month == 9) {
        return "September";
    } else if (month == 10) {
        return "October";
    } else if (month == 11) {
        return "November";
    } else {
        return "December";
    }
}