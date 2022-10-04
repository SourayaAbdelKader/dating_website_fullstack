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