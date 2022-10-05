const website_pages = "http://127.0.0.1:8000/api/v/";
// get the user information from the db (speacially if edited)
const getUserAPI = async () => {
    try{
        await axios(website_pages+"getUserInfo/"+localStorage.getItem("id"))
        .then((data) => {
                element = data.data.data[0];
                let age = calculateAge(element);
                details = element.location.split(",") // get the long and the lat
                const v = details[0];
                const l = details[1];
                // this function is used to take the user longtiture and lattitude and get the city he lives in, tried to implement it in a separate function and it won't take parameters
                navigator.geolocation.getCurrentPosition(function(location) {
                    var api_key = '294a9c72c0fd403a9592db51a8764026';
                    var latitude = v;
                    var longitude = l;                        
                    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
                    var request_url = api_url
                    + '?'
                    + 'key=' + api_key
                    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
                    + '&pretty=1'
                    + '&no_annotations=1';
                    window.localStorage.setItem('city', JSON.stringify(""));
                    var request = new XMLHttpRequest();
                    request.open('GET', request_url, true);
                    request.onload = function() {
                    if (request.status === 200){
                        var data = JSON.parse(request.responseText);
                        location = data.results[0].formatted;
                        details = location.split(",");
                        city_place = details[1].split(" ");
                        city = city_place[1];

                        // to construct the user component 
                        const container = document.getElementById("info_container");
                        let div = document.createElement("div");
                        div.innerHTML = `
                        <div class="user_information">
                            <div class="upload">
                                <button class="btn-wrapper"> 
                                    <i class="img-upload "> <img src="${element.pic_url}"> </i>
                                    <input class="btn-warning" accept="image/jpeg,image/png,image/webp" type="file" >
                                </button>
                            </div>
                            <div> <h2> ${element.name} </h2> </div>
                        </div>                 
                        <div class="user_details"> 
                            <div class="flex"> <h3 class="space"> Email: </h3> <h3> ${element.email} </h3> </div>
                            <div class="flex"> <h3 class="space"> Age: </h3> <h3> ${age} </h3> </div>
                            <div class="flex"> <h3 class="space"> Location: </h3> <h3> ${city} </h3> </div>
                            <div class="flex"> <h3 class="space"> Gender: </h3> <h3> ${element.gender} </h3> </div>
                            <div class="flex"> <h3 class="space"> Interested In: </h3> <h3> ${element.interested_in} </h3> </div>
                            <div class="flex_baseline"> <h3 class="space"> Bio: </h3> <p> ${element.bio} </p> </div>
                            <div class="flex_center"> 
                                <h3 class="space"> Visibility </h3> 
                                <label class="switch">
                                    <input id="visible" type="checkbox checked">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>`;
                        const visible = document.getElementById("visible");
                        if(localStorage.getItem("visible")== 0){
                            visible.checked = false;
                        }
                        container.appendChild(div); 
                        switchToNotVisible();

                    } else if (request.status <= 500){                        
                        console.log("unable to geocode! Response code: " + request.status);
                        var data = JSON.parse(request.responseText);
                        console.log('error msg: ' + data.status.message);
                    } else {console.log("server error");}};
                    request.onerror = function() {console.log("unable to connect to server");};
                    request.send();  // make the request
                    })
                
                    if (navigator.geolocation) {window.navigator.geolocation.getCurrentPosition(console.log, console.error);}})   
    }catch(error){console.log("Error from GET API", error);}
}

// the following functions are used to calculate the age of a user, favorite, block or message a user
const calculateAge = (element) => {
    let date =  new Date().getFullYear();
    return date - element.birth_date.slice(0,4);
}

// call the function
getUserAPI();

// to make the user unvisible 
const switchToNotVisible = ()=>{
    const visible = document.getElementById("visible");
    visible.addEventListener("click", async () => {
        api_data = new FormData();
        api_data.append("id", localStorage.getItem("id"))
        await axios.post(website_pages+"notVisible", api_data)
            .then((data) => {console.log(data.data.data);
})})};

// to edit the profile
// ____ to handle the buttons _______
const user_male = document.getElementById("user_male");
const user_female = document.getElementById("user_female");
const choose_male = document.getElementById("choose_male");
const choose_female = document.getElementById("choose_female");
const choose_both = document.getElementById("choose_both");

// defining the buttons and pop up
const edit_btn = document.getElementById("edit");
const edit_pop_up = document.getElementById("edit_pop_up");
const submit_edit = document.getElementById("submit_edit");
const cancel = document.getElementById("cancel");
const confirm_edit = document.getElementById("confirm_edit");

// show and hide the pop up
edit_btn.addEventListener("click", ()=>{edit_pop_up.classList.remove("hide");})
cancel.addEventListener("click", ()=>{edit_pop_up.classList.add("hide");})

// defining the inputs
const new_name = document.getElementById("name");
const email = document.getElementById("email");
const bio = document.getElementById("bio");
const birth_date = document.getElementById("birth_date");

// to reset all inputs
const resetAllInputs = () => {
    new_name.value = "";
    email.value = "";
    bio.value="";
    birth_date.value="";
    user_male.classList.remove("dark_gray");
    user_female.classList.remove("dark_gray");
    choose_male.classList.remove("dark_gray");
    choose_female.classList.remove("dark_gray");
    choose_both.classList.remove("dark_gray");
  };

const empty = (element) => {
    if(element.value){
        return false;};
    element.classList.add("error");
    return true; 
}

const validInputs = () => {
    if(!empty(new_name) && !empty(email) && !empty(bio) && !empty(birth_date)){
        return true
    }
    return false
}

// to get the data for the sign up
const api_data = new FormData();

// choose the user gender
user_male.addEventListener("click", () => {
    user_male.classList.add("dark_gray");
    user_female.classList.remove("dark_gray");
    api_data.append("gender", "male");
});

user_female.addEventListener("click", () => {
    user_female.classList.add("dark_gray");
    user_male.classList.remove("dark_gray");
    api_data.append("gender", "female");
});

// choose the interested in gender
choose_male.addEventListener("click", ()=>{
    choose_male.classList.add("dark_gray");
    choose_female.classList.remove("dark_gray");
    choose_both.classList.remove("dark_gray");
    api_data.append("interested_in", "male");
})

choose_female.addEventListener("click", ()=>{
    choose_female.classList.add("dark_gray");
    choose_male.classList.remove("dark_gray");
    choose_both.classList.remove("dark_gray");
    api_data.append("interested_in", "female");
})

choose_both.addEventListener("click", ()=>{
    choose_both.classList.add("dark_gray");
    choose_male.classList.remove("dark_gray");
    choose_female.classList.remove("dark_gray");
    api_data.append("interested_in", "both");
})

const editUser = () => {
    submit_edit.addEventListener("click", async()=>{ 
        if (validInputs()){ 
            new_name.classList.remove("error");
            email.classList.remove("error");
            bio.classList.remove("error");
            birth_date.classList.remove("error");
            
            api_data.append("name", new_name.value);
            api_data.append("email", email.value);
            api_data.append("bio", bio.value);
            api_data.append("birth_date", birth_date.value);
            await axios.post(
                website_pages+"update/"+localStorage.getItem("id"),
                api_data)
            .then((data)=> {console.log(data)});
            confirm_edit.classList.remove("hide");
            edit_pop_up.classList.add("hide");
            setTimeout(function() {confirm_edit.classList.add("hide");;}, 1000);
}})}

editUser();