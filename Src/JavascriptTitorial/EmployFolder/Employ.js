var AllData =[];
var id1 = document.querySelector("#id");
var firstname1 = document.querySelector("#firstname");
var lastname1 = document.querySelector("#lastname");
var email1 = document.querySelector("#email");
var phoneno1 = document.querySelector("#phoneno");
var jobtitle1 = document.querySelector("#jobtitle");
var joblocation1 = document.querySelector("#joblocation");
var registerbtn1 = document.querySelector("#registerbtn");

// Start Crude Operation here....
registerbtn.onclick = function(){
    RegistrationData();
};
function RegistrationData(){
    AllData.push({
        id : id1.value,
        firstname : firstname1.value,
        lastname : lastname1.value,
        phoneno : phoneno1.value,
        jobtitle : joblocation1.value,
        joblocation : joblocation1.value, 
    });
    var UserString = JSON.stringify(AllData);
    localStorage.setItem("AllData",UserString);
}