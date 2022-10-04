const website_pages = "http://127.0.0.1:8000/api/";

 
const getAPI = async () => {
            try{
                await axios(website_pages+"users/"+"1")
                .then((data) => {
                    console.log(data.data.data);
                    data.data.data.forEach(element => {
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
                                const container = document.getElementById("user_container");
                                let div = document.createElement("div");
                                div.innerHTML = `<div id="${element.id}" class="user">
                                <div class="picture"> <img class="user_image" src="${element.pic_url}"> </div>
                                <div class="space_between"> 
                                    <div> <a href="./show_user.html"> <h3> ${element.name} </h3> </a> </div>  
                                    <div> <h4> ${age} y.o </h4> </div>
                                </div>
                                <div class="space_between">
                                <div> <p> ${city} </p> </div>
                                <div> <img class="icon cursor" src="./assets/Picture1.png"> </div>
                                </div>
                                </div>`;
                                container.appendChild(div); 

                                selected_user();

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
                                .getCurrentPosition(console.log, console.error);}})});   
            }catch(error){console.log("Error from GET API", error);}
        }

console.log(getAPI());

const calculateAge = (element) => {
    let date =  new Date().getFullYear();
    return date - element.birth_date.slice(0,4);
}


    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
}

    // Converts numeric degrees to radians
function toRad(Value){
        return Value * Math.PI / 180;
}

const selected_user = () => {
const selected_user = document.querySelectorAll(".user");
    console.log(selected_user.length);
    selected_user.forEach((user) => {
    user.addEventListener("click", () => {
    localStorage.setItem("selected_user", user.id);
});
})};



