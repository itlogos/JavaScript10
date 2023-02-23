$(document).ready(function() {
    $("#Surname").keyup(check);
    $("#Name").keyup(check);
    $("#Age").blur(validateAge);
    $("#Address").keyup(check);

    $("#AjaxGET").click(sendDataByGetMethod);
    $("#AjaxPOST").click(sendDataByPostMethod);
})

function check() {
    let surname = $("#Surname").val();
    let name = $("#Name").val();
    let age = $("#Age").val();
    let address = $("#Address").val();

    if (surname && name && (age > 0 && age <= 100) && address) {
        $("#Message").css("visibility", "hidden");
        $("#AjaxGET").prop("disabled", false);
        $("#AjaxPOST").prop("disabled", false);
    } else {
        $("#Message").css("visibility", "visible");
        $("#AjaxGET").prop("disabled", true);
        $("#AjaxPOST").prop("disabled", true);
    }
}

function validateAge() {
    let age = $("#Age");

    if (age.val() > 0 && age.val() < 101) {
        age.removeClass("error");
    } else {
        age.addClass("error");
        age.val("");
        age.focus();
        console.log("Вік повинен бути від 1 до 100");
    }
}

function sendDataByGetMethod() {
    let userData = {
        userSurname : $("#Surname").val(),
        userName : $("#Name").val(),
        userAge : $("#Age").val(),
        userAddress : $("#Address").val()
    };

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/userGet?Surname=" + userData.userSurname + "&Name="
            + userData.userName + "&Age=" + userData.userAge + "&Address="
            + userData.userAddress,
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });
}

function sendDataByPostMethod() {
    let userData = {
        userSurname : $("#Surname").val(),
        userName : $("#Name").val(),
        userAge : $("#Age").val(),
        userAddress : $("#Address").val()
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(userData),
        contentType: "application/json",
        url: "/userPost",
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });
}
