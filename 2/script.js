var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}




function validateForm() {

    // This function deals with validation of the form fields
    var x, y, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");

    // for firstname and lastname field valid
    var numbers = /^[-+]?[0-9]+$/;

    // for email valid
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            // alert("no valid");
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            valid = false;
        }
        else if (y[i].value !== "") {
            // alert("all ok..valid true");
            console.log(y[i].parentNode.parentNode.className);

            //for name field
            if (y[i].parentNode.parentNode.className == "tab name") {
                console.log("text");
                if (y[i].value.match(numbers)) {
                    // alert("letter only format");
                    y[i].className += " deep_invalid";
                    valid = false;
                }
                else {
                    return valid;
                }
            }
            // for contact field
            if (y[i].parentNode.parentNode.className == "tab contact") {
                console.log("contact");
                if (y[i].type == "email") {
                    if (y[i].value.match(mailformat)) {
                        console.log("mailformat");
                        var reg_email = y[i].value;
                        console.log(reg_email);
                        return valid;
                    } else {
                        console.log("not mailformat")
                        y[i].className += " deep_invalid";
                        valid = false;
                    }
                }
                if (y[i].type == "password") {
                    var reg_pass = y[i].value;
                    console.log(reg_pass);
                    return valid;
                }
            }
            // for dob field
            if (y[i].parentNode.parentNode.className == "tab dob") {
                console.log("dob");
                if (y[i].value.match(mailformat)) {
                    alert("mailformat");
                    y[i].className += " deep_invalid";
                    valid = false;
                }
                else {
                    return valid;
                }
            }
            //for login field
            if (y[i].parentNode.parentNode.className == "tab login") {
                console.log("login");

                // return valid;
            }
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

