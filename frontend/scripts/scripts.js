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
    signup_location.value = "";
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
