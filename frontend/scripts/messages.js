const website_pages = "http://127.0.0.1:8000/api/v/";

const getMessagesApi = async () => {
    try{
        await axios(website_pages+"messages/"+localStorage.getItem("id"))
        .then((data) => {
            // display no messages
            if (data.data.data.length == 0) {
                const container = document.getElementById("message_container");
                let div = document.createElement("div");
                div.innerHTML = 
                `<div  id="sent_message" class="flex_center"> 
                    <div> <img class="medium_icon" src="./assets/R.png"> </div>
                    <div> <h3> No Messages yet </h3> </div>
                </div>`;
                container.appendChild(div); 
            }
            // display messages
            data.data.data.forEach(element => {
            console.log(element);
            // to construct the user component 
            const container = document.getElementById("message_container");
            let div = document.createElement("div");
            div.innerHTML = 
            `<div id="${element.receiver_id}" class="message flex_center space_between width margin"> 
                <div class="flex_center">
                    <div> <img class="sender_image space" src="${element.pic_url}"> </div>
                    <div> <a href="./show_user.html" <h3> ${element.name} </h3> </a> </div>
                </div>
                <div class="flex_center"> <p> ${element.message} </p> </div>
                <div> <button id="reply${element.user_id}" class="reply sign_up" type="submit"> Reply </button></div>
            </div>`;
            container.appendChild(div); });
            sendMessage();
        })}catch(error){console.log("Error from GET API", error);}
};

getMessagesApi();

const selected_user = () => {
    const selected_user = document.querySelectorAll(".message");
        selected_user.forEach((user) => {
        user.addEventListener("click", () => {
        localStorage.setItem("selected_user", user.id);
});
})};

const sendMessage = () => {
    const message = document.querySelectorAll(".reply");
    const send = document.getElementById("message_pop_up");
    const cancel = document.getElementById("cancel");
    const message_content = document.getElementById("message_content");
    const send_message_btn = document.getElementById("send_message_btn");
    const sent_message = document.getElementById("sent_message");
    message.forEach(one => {
        one.addEventListener("click", () => {
        send.classList.remove("hide");
        cancel.addEventListener("click", ()=> {send.classList.add("hide");});
        send_message_btn.addEventListener("click", async()=>{
            if(!message_content.value){message_content.classList.add("error");}
            if(message_content.value){
                const id = one.id.slice(5, one.id.length); //getting the id of the message sender from a div id
                let api_data = new FormData();
                api_data.append("user_id", localStorage.getItem("id"));
                api_data.append("receiver_id",id);
                api_data.append("message", message_content.value);
                message_content.classList.remove("error");
                await axios.post(
                    website_pages+"sendMessage",
                    api_data,)
                .then((data)=> {console.log(data)});
                send.classList.add("hide");
                sent_message.classList.remove("hide");
                setTimeout(function() {sent_message.classList.add("hide");;}, 1000);
            }
        })})        
})};