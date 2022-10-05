// saved the selected user in the local storage
const website_pages = "http://127.0.0.1:8000/api/";

const getUserAPI = async () => {
    try{
        await axios(website_pages+"getUserInfo/"+1)
        .then((data) => {
            console.log(data.data.data);
            element = data.data.data[0];
                let age = calculateAge(element);
                details = element.location.split(",")
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
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>`;
                        container.appendChild(div); 
                        addFavorite();
                        block_user();
                        sendMessage();

                    } else if (request.status <= 500){                        
                        console.log("unable to geocode! Response code: " + request.status);
                        var data = JSON.parse(request.responseText);
                        console.log('error msg: ' + data.status.message);
                    } else {console.log("server error");}};
                    request.onerror = function() {console.log("unable to connect to server");};
                    request.send();  // make the request
                    })
                
                    if (navigator.geolocation) {
                        window.navigator.geolocation
                        .getCurrentPosition(console.log, console.error);}})   
    }catch(error){console.log("Error from GET API", error);}
}

// the following functions are used to calculate the age of a user, favorite, block or message a user
const calculateAge = (element) => {
    let date =  new Date().getFullYear();
    return date - element.birth_date.slice(0,4);
}
getUserAPI();


