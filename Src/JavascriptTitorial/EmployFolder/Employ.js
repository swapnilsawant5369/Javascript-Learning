var AllData = [];
var FormData = document.querySelector("#Form_Data");
var DataAddRegisterBtn = document.querySelector("#Data_AddRegisterBtn");
var UserID = document.querySelector("#User_ID");
var UserFname = document.querySelector("#User_Fname");
var UserLname = document.querySelector("#User_Lname");
var UserEmail = document.querySelector("#User_Email");
var UserPhoneNo = document.querySelector("#User_PhoneNo");
var UserJobTitle = document.querySelector("#User_JobTitle");
var UserJobLocation = document.querySelector("#User_JobLocation");


// Data Store in LocalStorage
Data_AddRegisterBtn.onclick = function (e) {
    e.preventDefault();
    RegistrationData();
    DatashowTable();
    FormData.reset("");
    location.reload(true);
};
if (localStorage.getItem("AllData") != null) {
    AllData = JSON.parse(localStorage.getItem("AllData"));
}

function RegistrationData() {
    AllData.push({
        User_ID: UserID.value,
        User_Fname: UserFname.value,
        User_Lname: UserLname.value,
        User_Email: UserEmail.value,
        User_PhoneNo: UserPhoneNo.value,
        User_JobTitle: UserJobTitle.value,
        User_JobLocation: UserJobLocation.value,
        ImagePic: ImgUrl == undefined ? "Images/Office-Man.jpeg" : ImgUrl,
    });
    var UserString = JSON.stringify(AllData);
    // AddUser Data Alert Code Start...
    Swal.fire({
        position: "center",
        icon: "success",
        title: "You are Successful Details Fill.",
        showConfirmButton: false,
        timer: 1200
    });
    // Add Alert Code End...
    localStorage.setItem("AllData", UserString);
};


// Table Data Start Here...
var TableBodyData = document.querySelector("#TableBody_Data");

const DatashowTable = () => {
    TableBodyData.innerHTML = ""
    AllData.forEach((data, index) => {
        TableBodyData.innerHTML += ` 
            <tr index="${index}">
                <th scope="row">${index + 1}</th>
                <td><img src="${data.ImagePic}" height="40" width="40" style="border-radius: 50%;"/></td>
                <td>${data.User_ID}</td>
                <td>${data.User_Fname}</td>
                <td>${data.User_Lname}</td>
                <td>${data.User_Email}</td>
                <td>${data.User_PhoneNo}</td>
                <td>${data.User_JobTitle}</td>
                <td>${data.User_JobLocation}</td>
                <td>
                    <button id='DeleteRow_Data' class="IconBtn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button id='Update_UserData' data-toggle="modal" data-target="#exampleModalCenter" class="IconBtn"><i class="fa fa-eye" aria-hidden="true"></i></button>
                </td>
            </tr>
        `;
    });


    // Delete Table Row Code Start Here...
    var i;
    var DeleteRowData = document.querySelectorAll("#DeleteRow_Data");

    for (i = 0; i < DeleteRowData.length; i++) {
        DeleteRowData[i].onclick = function () {
            var Tablerow = this.parentElement.parentElement;
            var IDPass = Tablerow.getAttribute("index");
            // Delete Alert Code Start...
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    AllData.splice(IDPass, 1);
                    localStorage.setItem("AllData", JSON.stringify(AllData))
                    Tablerow.remove();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
            // Delete Alert Code End...
        }
    };


    // Edit/Update User Data Code Start Here...
    var UpdateRegisterBtn = document.querySelector("#Update_RegisterBtn");
    var UpdateUserData = document.querySelectorAll("#Update_UserData");

    for (i = 0; i < UpdateUserData.length; i++) {
        UpdateUserData[i].onclick = function () {
            Tablerow = this.parentElement.parentElement;
            var TableData = Tablerow.getElementsByTagName("TD");
            var Index = Tablerow.getAttribute("index");
            var ImgTag = TableData[0].getElementsByTagName("IMG");
            var ProfilePic = ImgTag[0].src;
            var User_ID = TableData[1].innerHTML;
            var User_Fname = TableData[2].innerHTML;
            var User_Lname = TableData[3].innerHTML;
            var User_Email = TableData[4].innerHTML;
            var User_PhoneNo = TableData[5].innerHTML;
            var User_JobTitle = TableData[6].innerHTML;
            var User_JobLocation = TableData[7].innerHTML;
            DataAddRegisterBtn.disabled = true;
            UpdateRegisterBtn.disabled = false;
            UserID.value = User_ID;
            UserFname.value = User_Fname;
            UserLname.value = User_Lname;
            UserEmail.value = User_Email;
            UserPhoneNo.value = User_PhoneNo;
            UserJobTitle.value = User_JobTitle;
            UserJobLocation.value = User_JobLocation;
            SrcImageShow.src = ProfilePic;
            UpdateRegisterBtn.onclick = function (event) {
                event.preventDefault();
                AllData[Index] = {
                    User_ID: UserID.value,
                    User_Fname: UserFname.value,
                    User_Lname: UserLname.value,
                    User_Email: UserEmail.value,
                    User_PhoneNo: UserPhoneNo.value,
                    User_JobTitle: UserJobTitle.value,
                    User_JobLocation: UserJobLocation.value,
                    ImagePic: ImageSelectBtn.value == "" ? SrcImageShow.src : ImgUrl,
                };
                //  Alert Code Start
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 15   00,
                    timerProgressBar: true,
                    didOpen: () => {
                        localStorage.setItem("AllData", JSON.stringify(AllData));
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Update successfully"
                });
                // location.reload(true);
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
                //  Alert Code End
                AllData(false);
            };
        }
    }
}
DatashowTable();


// Image Uplode and Select Code Start Here...
var SelectImgInput = document.querySelector("#SelectImg_Input");
var SrcImageShow = document.querySelector("#SrcImage_Show");
var ImageSelectBtn = document.querySelector("#ImageSelect_Btn");
var ImgUrl;

SelectImgInput.onchange = function () {
    if (SelectImgInput.files[0].size < 1000000) {
        var Freder = new FileReader();
        Freder.onload = function (e) {
            ImgUrl = e.target.result;
            SrcImageShow.src = ImgUrl;
            console.log(ImgUrl);
        }
        Freder.readAsDataURL(SelectImgInput.files[0]);
    } else {
        alert("File size is not valid !");
    }
};


