let autocomplete;

function initAutocomplete() {
    // Attach autocomplete to the input field
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['address'], // only addresses
            componentRestrictions: { country: "us" }, // optional: restrict to a country
            fields: ["formatted_address"] // what data to return
        }
    );

    // When the user selects an address
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected place:", place.formatted_address);
        // You can fill hidden fields with place data if needed
    });
}

// Initialize after script load
window.onload = initAutocomplete;


let currentTab = 0
show(currentTab)

function show(tab) {
    let tabs = document.getElementsByClassName("tab")
    tabs[tab].style.display = "block"

    if (tab == 0) {
        //this is the first tab so we don't want the previous button to show
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "block";
    }

    if (tab == (tabs.length - 1) || tab == (tabs.length - 2)) {
        //if its the last tab then we want to change the name of the button
        //last tab is either of the two last tabs hence the condition above
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    
}

function switchTab(direction) {
    //FIXME seed amount for NO with YES&YES?

    let tabs = document.getElementsByClassName("tab")

    if (direction == 1 && !validateTab()) {
        return false
    }

    prevTab = currentTab

    //conditional logic here
    //we are on the first tab and want to go forward
    if (currentTab == 0 && direction == 1) {
        //look at accredited investor
        let accredited = document.getElementById("accreditedInvestor").value
        if (accredited == "No") {
            currentTab = 1 //correct set of questions if they answer no
        } else if (accredited == "Yes") {
            currentTab = 2 //correct set of questions if they answer yes
        }
    } else if (direction == -1) {
        if (currentTab == 2) {
            currentTab += -2 //skip past the "No branch"
        } else {
            currentTab += direction
        }
    } else if (currentTab == 1 && direction == 1) {
        let netWorth = document.getElementById("netWorth").value
        let income = document.getElementById("income").value

        if (netWorth == "Yes" && income == "Yes") {
            currentTab += direction
        } else {
            currentTab += 2 //skip past the "Yes branch"
        }
        
    } else {
        currentTab += direction
    }

    //if we have reached the end of the form, we want to submit
    console.log(currentTab, tabs.length)
    if (currentTab >= tabs.length) {
        if (prevTab == 1) {
            //No
            //case were skip past last set of questions
            window.location.href = 'https://tiderise.onrender.com/investFormOutcome1.html'
            

        } else if (prevTab == 2) {
            //Yes
            let seedAmount = document.getElementById("seedAmount").value
            if (seedAmount < 100000) {
                console.log("denied")
            } else {
                document.getElementById("investForm").submit()
            }
        }
        
    } else {
        //hide the now "previous" tab
        tabs[prevTab].style.display = "none"
        show(currentTab)
    }
}

function validateTab() {
    // This function deals with validation of the form fields
    let valid = true;
    let tabs = document.getElementsByClassName("tab");
    let fields = tabs[currentTab].querySelectorAll("input, select")

    // A loop that checks every input field in the current tab:
    for (let i = 0; i < fields.length; i++) {
        //if field is empty then we have to enforce it
        if (fields[i].value == "") {
        fields[i].className += " invalid";
        valid = false;
    }
  }

  return valid;
}


