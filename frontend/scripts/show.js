// saved the selected user in the local storage
const user_id = localStorage.getItem("selected_user");
const website_pages = "http://127.0.0.1:8000/api/v/";

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
                        const container = document.getElementById("show_container");
                        let div = document.createElement("div");
                        div.innerHTML = `
                        <div class="user_information">
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
                                            <div> <button id="block" type="submit"> <img id="block_image" class="message_icon" src="./assets/block.png"> </button>  </div>
                                        </div>
                                    </div>    
                                </div>
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

// to favorite this user 
const addFavorite = () => {
    const like = document.getElementById("like");
    const like_image = document.getElementById("like_image");
    like.addEventListener("click", async() => {
        like_image.src = "./assets/liked.png";
        await axios(website_pages+"addFavorite/"+localStorage.getItem("id")+" "+user_id)
            .then((data) => {
                console.log(data)})
})};

const block_user = () => {
    const block = document.getElementById("block");
    const block_image = document.getElementById("block_image");
    const block_message = document.getElementById("block_pop_up");
    block.addEventListener("click", async() => {
        block_image.src = "./assets/blocked.png";
        await axios(website_pages+"block/"+localStorage.getItem("id")+" "+user_id)
            .then((data) => {
                console.log(data)})
        block_message.classList.remove("hide");
})};

const sendMessage = () => {
    const message = document.getElementById("message");
    const send = document.getElementById("message_pop_up");
    const cancel = document.getElementById("cancel_message");
    const message_content = document.getElementById("message_content");
    const send_message_btn = document.getElementById("send_message_btn");
    const sent_message = document.getElementById("sent_message");
    message.addEventListener("click", () => {
        send.classList.remove("hide");
        cancel.addEventListener("click", ()=> {
            send.classList.add("hide");
        })
        send_message_btn.addEventListener("click", async()=>{
            if(!message_content.value){
                message_content.classList.add("error");
            }
            if(message_content.value){
                console.log(message_content.value);
                let api_data = new FormData();
                api_data.append("user_id", localStorage.getItem("id"));
                api_data.append("receiver_id", user_id);
                api_data.append("message", message_content.value);
                message_content.classList.remove("error");
                await axios.post(
                    website_pages+"sendMessage",
                    api_data,)
                .then((data)=> {console.log(data)});
                send.classList.add("hide");
                sent_message.classList.remove("hide");
                setTimeout(function() {
                    sent_message.classList.add("hide");;
                }, 1000);
            }
        })        
})};
