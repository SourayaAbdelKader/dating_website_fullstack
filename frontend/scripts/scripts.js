const website_pages = "http://127.0.0.1:8000/api/v/";

// defining buttons and pop ups
const login_btn = document.getElementById("login_btn");
const signup_btn = document.getElementById("signup_btn");
const submit_login_btn = document.getElementById("submit_login_btn");
const login_modal = document.getElementById("login_modal");
const cancel_btn = document.getElementById("cancel_btn");

// sign up inputs
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_location = document.getElementById("singnup_location");
const signup_gender_m = document.getElementById("signup_gender_male");
const signup_gender_f = document.getElementById("signup_gender_female");
const signup_interested_in_m = document.getElementById("signup_interested_in_male");
const signup_interested_in_f = document.getElementById("signup_interested_in_female");
const signup_interested_in_b = document.getElementById("signup_interested_in_both");

// sign in inputs
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");

//
// to choose a gender
const userMale =  () => { 
    signup_gender_m.classList.add("dark_gray");
    signup_gender_f.classList.remove("dark_gray");
};

const userFemale = () => { 
    signup_gender_f.classList.add("dark_gray");
    signup_gender_m.classList.remove("dark_gray");
};

const chooseMale = () => { 
    signup_interested_in_m.classList.add("dark_gray");
    signup_interested_in_f.classList.remove("dark_gray");
    signup_interested_in_b.classList.remove("dark_gray");
};

const chooseFemale = () => { 
    signup_interested_in_f.classList.add("dark_gray");
    signup_interested_in_m.classList.remove("dark_gray");
    signup_interested_in_b.classList.remove("dark_gray");
};

const chooseBoth = () => { 
    signup_interested_in_b.classList.add("dark_gray");
    signup_interested_in_f.classList.remove("dark_gray");
    signup_interested_in_m.classList.remove("dark_gray");
};

// to reset all inputs
const resetAllInputs = () => {
    login_email.value = "";
    login_password.value = "";
    signup_email.value = "";
    signup_gender_m.classList.remove("dark_gray");
    signup_gender_f.classList.remove("dark_gray");
    signup_interested_in_b.classList.remove("dark_gray");
    signup_interested_in_f.classList.remove("dark_gray");
    signup_interested_in_m.classList.remove("dark_gray");
  };


// show and hide login pop up
const showLoginModal = () => {
    resetAllInputs();
    login_modal.classList.remove("hide");
};

const hideLoginModal = () => {
    resetAllInputs();
    login_modal.classList.add("hide");
};

login_btn.addEventListener("click", showLoginModal);
cancel_btn.addEventListener("click", hideLoginModal);

function uploadImage() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        base64string_profile = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        img_show.src = e.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    }
};


// on window load if there is a user redirect:
const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) window.location.href = "./home.html";
};
window.addEventListener("load", checkUser);

navigator.geolocation.getCurrentPosition(function(location) {
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    console.log(location.coords.accuracy);
    var api_key = '294a9c72c0fd403a9592db51a8764026';
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {

    if (request.status === 200){
        // Success!
        var data = JSON.parse(request.responseText);
        console.log(data.results[0].formatted); // print the location

    } else if (request.status <= 500){
        // We reached our target server, but it returned an error

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
    } else {
        console.log("server error");
    }
    };

request.onerror = function() {
  // There was a connection error of some sort
  console.log("unable to connect to server");
};

request.send();  // make the request

  })

if (navigator.geolocation) {
    window.navigator.geolocation
    .getCurrentPosition(console.log, console.error);
}