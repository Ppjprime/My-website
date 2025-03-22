// For the Map Page (map.html)

// Global variables for the map page
let map;
let markers = { blue: [], red: [] };
let previewCircle = null;
const correctPassword = "123";

// This function initializes the Google Map on map.html
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 12,
    });

    map.addListener("click", function(event) {
        if (previewCircle) previewCircle.setMap(null);

        let markType = document.getElementById("markType").value;
        let color = markType === "blue" ? "#007BFF" : "#DC3545";

        previewCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: "transparent",
            map: map,
            center: event.latLng,
            radius: 200,
        });

        window.lastClickLocation = event.latLng;
        document.getElementById("markerForm").style.display = "block";
    });
}

function toggleMarkerForm() {
    let form = document.getElementById("markerForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function confirmAndPlaceMarker() {
    let enteredPassword = document.getElementById("passwordInput").value;
    if (enteredPassword !== correctPassword) {
        alert("Incorrect Password!");
        return;
    }

    let markType = document.getElementById("markType").value;
    if (markers[markType].length >= 4) {
        alert(`Max limit of 4 ${markType.toUpperCase()} markers reached!`);
        return;
    }

    let color = markType === "blue" ? "#007BFF" : "#DC3545";

    let circle = new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 1,
        fillColor: color,
        fillOpacity: 0.4,
        map: map,
        center: window.lastClickLocation,
        radius: 200,
    });

    markers[markType].push(circle);
    previewCircle.setMap(null);
    updateMarkerList();
    document.getElementById("markerForm").style.display = "none";
}

function updateMarkerList() {
    document.getElementById("blueMarks").innerHTML = markers.blue.map((_, i) => `<div class="marker-item"><span class="marker-color blue-dot"></span> Blue Marker ${i + 1}</div>`).join('');
    document.getElementById("redMarks").innerHTML = markers.red.map((_, i) => `<div class="marker-item"><span class="marker-color red-dot"></span> Red Marker ${i + 1}</div>`).join('');
}

function clearMarkers() {
    markers.blue.forEach(m => m.setMap(null));
    markers.red.forEach(m => m.setMap(null));
    markers.blue = [];
    markers.red = [];
    updateMarkerList();
}

// For the Registration Page (register.html)
// Basic functions for OTP simulation

function sendOTP(type) {
    alert(type.toUpperCase() + " OTP sent!");
    document.getElementById(type + "Otp").style.display = "block";
    document.getElementById(type + "Otp").focus();
}

function submitForm() {
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let aadhaar = document.getElementById("aadhaar").value;
    
    if (!phone || !email || !aadhaar) {
        alert("Please fill all fields.");
        return;
    }
    
    alert("Registration Successful!");
    document.getElementById("status").innerText = "✔️ Registration Complete. Verification call in 7 working days.";
}