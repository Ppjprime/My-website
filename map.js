// Global variables for the map page
let map;
let markers = { blue: [], red: [], orange: [] };
let previewCircle = null;
const correctPassword = "123";

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map when the page loads
  initMap();
  
  // Check if user is logged in
  const userType = sessionStorage.getItem('userType');
  const userName = sessionStorage.getItem('userName');
  
  if (userType && userName) {
    // Show user info
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userName').textContent = userName;
    document.getElementById('userType').textContent = userType;
    
    // If the user is a verified volunteer or authority, show chat section
    if (userType === 'volunteer' || userType === 'authority') {
      document.getElementById('chatSection').style.display = 'block';
    }
    
    // If the user is an authority, show the orange mark option
    if (userType === 'authority') {
      document.querySelectorAll('.authority-only').forEach(el => {
        el.style.display = 'block';
      });
      document.querySelector('.orange-list').style.display = 'block';
    }
  }
});

// This function initializes the Google Map
function initMap() {
  // Create map centered on Delhi
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 },
    zoom: 12,
  });
  
  // Add click listener to the map
  map.addListener("click", function(event) {
    // Remove previous preview circle if exists
    if (previewCircle) previewCircle.setMap(null);
    
    // Only allow marking if user is logged in
    const userType = sessionStorage.getItem('userType');
    if (!userType) {
      alert("Please login to mark locations on the map");
      return;
    }
    
    let markType = document.getElementById("markType").value;
    let color = getColorForMarkType(markType);
    
    // Create preview circle
    previewCircle = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.2,
      map: map,
      center: event.latLng,
      radius: 200,
    });
    
    window.lastClickLocation = event.latLng;
    document.getElementById("markerForm").style.display = "block";
  });
}

// Get color for marker type
function getColorForMarkType(markType) {
  switch(markType) {
    case "blue": return "#007BFF";
    case "red": return "#DC3545";
    case "orange": return "#FD7E14";
    default: return "#007BFF";
  }
}

// Toggle marker form visibility
function toggleMarkerForm() {
  // Only show form if user is logged in
  const userType = sessionStorage.getItem('userType');
  if (!userType) {
    alert("Please login to mark locations on the map");
    return;
  }
  
  let form = document.getElementById("markerForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Place marker after confirmation
function confirmAndPlaceMarker() {
  const userType = sessionStorage.getItem('userType');
  let markType = document.getElementById("markType").value;
  
  // Verify password for non-authority users or for orange markers
  if (userType !== 'authority' || markType === 'orange') {
    let enteredPassword = document.getElementById("passwordInput").value;
    if (enteredPassword !== correctPassword) {
      alert("Incorrect Password!");
      return;
    }
  }
  
  // Check marker limits for blue and red markers
  if ((markType === 'blue' && markers.blue.length >= 4) || 
      (markType === 'red' && markers.red.length >= 4)) {
    alert(`Max limit of 4 ${markType.toUpperCase()} markers reached!`);
    return;
  }
  
  // Check if orange markers can only be placed by authorities
  if (markType === 'orange' && userType !== 'authority') {
    alert("Only authorities can place orange markers!");
    return;
  }
  
  let color = getColorForMarkType(markType);
  
  // Create permanent marker
  let circle = new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 1,
    fillColor: color,
    fillOpacity: 0.4,
    map: map,
    center: window.lastClickLocation,
    radius: 200,
  });
  
  // Add marker to appropriate collection
  markers[markType].push(circle);
  
  // Remove preview circle and hide form
  if (previewCircle) previewCircle.setMap(null);
  updateMarkerList();
  document.getElementById("markerForm").style.display = "none";
}

// Update marker list in UI
function updateMarkerList() {
  document.getElementById("blueMarks").innerHTML = markers.blue.map((_, i) => 
    `<div class="marker-item"><span class="marker-color blue-dot"></span> Blue Marker ${i + 1}</div>`
  ).join('');
  
  document.getElementById("redMarks").innerHTML = markers.red.map((_, i) => 
    `<div class="marker-item"><span class="marker-color red-dot"></span> Red Marker ${i + 1}</div>`
  ).join('');
  
  if (document.querySelector('.orange-list').style.display !== 'none') {
    document.getElementById("orangeMarks").innerHTML = markers.orange.map((_, i) => 
      `<div class="marker-item"><span class="marker-color orange-dot"></span> Authority Marker ${i + 1}</div>`
    ).join('');
  }
}

// Clear all markers
function clearMarkers() {
  const userType = sessionStorage.getItem('userType');
  
  // Only authorities can clear all markers
  if (userType !== 'authority') {
    alert("Only authorities can clear all markers!");
    return;
  }
  
  // Remove all markers from map
  Object.keys(markers).forEach(type => {
    markers[type].forEach(m => m.setMap(null));
    markers[type] = [];
  });
  
  updateMarkerList();
}

// Chat functionality for verified users
function sendChatMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  const userType = sessionStorage.getItem('userType');
  const userName = sessionStorage.getItem('userName');
  
  if (!userType || !userName) {
    alert("Please login to use the chat");
    return;
  }
  
  const chatMessages = document.getElementById('chatMessages');
  const messageClass = userType === 'authority' ? 'authority-message' : 'volunteer-message';
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${messageClass}`;
  messageElement.innerHTML = `
    <strong>${userName} (${userType}):</strong>
    <p>${message}</p>
    <span class="message-time">${new Date().toLocaleTimeString()}</span>
  `;
  
  // Add message to chat
  chatMessages.appendChild(messageElement);
  
  // Clear input
  messageInput.value = '';
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
// Add this to map.js or a common script file
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userType = sessionStorage.getItem('userType');
    const userName = sessionStorage.getItem('userName');
    
    // Update navigation based on login status
    if (userType && userName) {
      // User is logged in - show logout and profile options
      updateNavForLoggedInUser(userType);
    }
  });
  
  function updateNavForLoggedInUser(userType) {
    // Get the navigation element
    const nav = document.querySelector('header nav');
    
    // Remove login and register links if logged in
    const loginLink = nav.querySelector('a[href="login.html"]');
    const registerLink = nav.querySelector('a[href="register.html"]');
    
    if (loginLink) loginLink.remove();
    if (registerLink) registerLink.remove();
    
    // Add profile and logout links
    const profileLink = document.createElement('a');
    profileLink.href = "profile.html";
    profileLink.textContent = "Profile";
    nav.appendChild(profileLink);
    
    const logoutLink = document.createElement('a');
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = "index.html";
    });
    nav.appendChild(logoutLink);
    
    // Add special navigation for authorities if applicable
    if (userType === 'authority') {
      const dashboardLink = document.createElement('a');
      dashboardLink.href = "dashboard.html";
      dashboardLink.textContent = "Dashboard";
      nav.appendChild(dashboardLink);
    }
  }