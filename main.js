// let autocomplete;

// function initAutocomplete() {
// // Attach autocomplete to the input field
// autocomplete = new google.maps.places.Autocomplete(
//     document.getElementById('autocomplete'),
//     {
//     types: ['address'], // only addresses
//     componentRestrictions: { country: "us" }, // optional: restrict to a country
//     fields: ["formatted_address", "geometry", "name"] // what data to return
//     }
// );

// // When the user selects an address
// autocomplete.addListener("place_changed", () => {
//     const place = autocomplete.getPlace();
//     console.log("Selected place:", place.formatted_address);
//     // You can fill hidden fields with place data if needed
// });
// }

// // Initialize after script load
// window.onload = initAutocomplete;


document.addEventListener('DOMContentLoaded', function() {
  const myForm = document.getElementById('myForm');
  const popupOverlay = document.getElementById('popupOverlay');
  const closePopup = document.getElementById('closePopup');

  myForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    popupOverlay.style.display = 'block'; // Show the popup
  });

  closePopup.addEventListener('click', function() {
    popupOverlay.style.display = 'none'; // Hide the popup
  });
});