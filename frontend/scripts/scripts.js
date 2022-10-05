const website_pages = "http://127.0.0.1:8000/api/v/";

// defining buttons and pop ups
const login_btn = document.getElementById("login_btn");
const signup_btn = document.getElementById("signup_btn");
const submit_login_btn = document.getElementById("submit_login_btn");
const login_modal = document.getElementById("login_modal");
const cancel_btn = document.getElementById("cancel_btn");

// sign up inputs
const signup_name = document.getElementById("signup_name");
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_birth_date = document.getElementById("signup_birth_date");
const signup_gender_m = document.getElementById("signup_gender_male");
const signup_gender_f = document.getElementById("signup_gender_female");
const signup_interested_in_m = document.getElementById("signup_interested_in_male");
const signup_interested_in_f = document.getElementById("signup_interested_in_female");
const signup_interested_in_b = document.getElementById("signup_interested_in_both");

// sign in inputs
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");

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

const empty = (element) => {
    if(element.value){
        return false;};
    element.classList.add("error");
    return true; 
}

const validInputs = () => {
    if(!empty(signup_name) && !empty(signup_email) && !empty(signup_password) && !empty(signup_birth_date)){
        return true
    }
    return false
}

// to get the data for the sign up
const api_data = new FormData();

// choose the user gender
signup_gender_m.addEventListener("click", () => {
    signup_gender_m.classList.add("dark_gray");
    signup_gender_f.classList.remove("dark_gray");
    api_data.append("gender", "male");
});

signup_gender_f.addEventListener("click", () => {
    signup_gender_f.classList.add("dark_gray");
    signup_gender_m.classList.remove("dark_gray");
    api_data.append("gender", "female");
});

// choose the interested in gender
signup_interested_in_m.addEventListener("click", ()=>{
    signup_interested_in_m.classList.add("dark_gray");
    signup_interested_in_f.classList.remove("dark_gray");
    signup_interested_in_b.classList.remove("dark_gray");
    api_data.append("interested_in", "male");
})

signup_interested_in_f.addEventListener("click", ()=>{
    signup_interested_in_f.classList.add("dark_gray");
    signup_interested_in_m.classList.remove("dark_gray");
    signup_interested_in_b.classList.remove("dark_gray");
    api_data.append("interested_in", "female");
})

signup_interested_in_b.addEventListener("click", ()=>{
    signup_interested_in_b.classList.add("dark_gray");
    signup_interested_in_f.classList.remove("dark_gray");
    signup_interested_in_m.classList.remove("dark_gray");
    api_data.append("interested_in", "both");
})


const signUp = () => {
    signup_btn.addEventListener("click", async()=>{ 
        if (validInputs()){ 
            signup_name.classList.remove("error");
            signup_email.classList.remove("error");
            signup_password.classList.remove("error");
            signup_birth_date.classList.remove("error");
            
            api_data.append("name", signup_name.value);
            api_data.append("email", signup_email.value);
            api_data.append("password", signup_password.value);
            api_data.append("birth_date", signup_birth_date.value);
            await axios.post(
                website_pages+"register",
                api_data,)
            .then((data)=> {console.log(data)});

            await axios(website_pages+"getUserInfoByEmail/"+signup_email.value)
            .then((data) => {
                console.log(data.data.data);
                element = data.data.data[0];
                localStorage.setItem("id", element.id);
                localStorage.setItem("name", element.name);
                localStorage.setItem("email", element.email);
                localStorage.setItem("location", element.location);
                localStorage.setItem("birth_date", element.birth_date);
                localStorage.setItem("gender", element.gender);
                localStorage.setItem("interested_in", element.interested_in);
                localStorage.setItem("bio", element.bio);
                localStorage.setItem("visible", element.visible);
                localStorage.setItem("pic_url", element.pic_url);
            })
        window.location.href = "./home.html"
}})}

signUp();
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

//

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
    api_data.append("location", latitude+","+longitude)

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
