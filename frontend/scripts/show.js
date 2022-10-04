const user_id = localStorage.getItem("selected_user");
const website_pages = "http://127.0.0.1:8000/api/";

const getUserAPI = async () => {
    try{
        await axios(website_pages+"getUserInfo/"+user_id)
        .then((data) => {
            console.log(data.data.data);
            element = data.data.data[0];
                let age = calculateAge(element);
                details = element.location.split(",")
                const v = details[0];
                const l = details[1];
                
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
                        const container = document.getElementById("show_container");
                        let div = document.createElement("div");
                        div.innerHTML = `<div class="user_information">
                        <div class=" flex">
                            <div> <img class="user_profile_picture space" src="${element.pic_url}"> </div>
                            <div class="user_details"> 
                                <div> <h2> ${element.name} </h2> </div>
                                <div> <h3> ${age} y.o </h3> </div>
                                <div> <h3> ${city} </h3> </div>
                                <div> <h3> ${element.gender} </h3> </div>
                                <div class="flex"> 
                                    <h3 class="space"> Interested In : </h3>
                                    <h3> ${element.interested_in} </h3>
                                </div>
                                <div> <p> ${element.bio} </p> </div>
                                <div class="icons flex_center">
                                    <div> <button id="like" type="submit"> <img id="like_image" class="message_icon" src="./assets/Picture1.png"> </button> </div>
                                    <div> <button id="message" type="submit"> <img class="message_icon" src="./assets/message.png"> </button> </div>
                                    <div> <button id="block" type="submit"> <img class="message_icon" src="./assets/block.png"> </button>  </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                        container.appendChild(div); 
                        addFavorite();

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

const calculateAge = (element) => {
    let date =  new Date().getFullYear();
    return date - element.birth_date.slice(0,4);
}
getUserAPI();

const addFavorite = () => {
const like = document.getElementById("like");
like.addEventListener("click", async() => {
    console.log("hi");
    const like_image = document.getElementById("like_image");
    like_image.src = "./assets/liked.png";
    await axios(website_pages+"addFavorite/"+1+" "+user_id)
        .then((data) => {
            console.log(data)})
})}