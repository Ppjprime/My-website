// Login page functionality

// Temporary user credentials for demo purposes
const users = {
  volunteers: [
    { id: "vol001", password: "volunteer123", name: "Volunteer 1", isVerified: true },
    { id: "vol002", password: "volunteer456", name: "Volunteer 2", isVerified: false }
  ],
  authorities: [
    { id: "auth001", password: "authority123", name: "Authority 1", role: "Police" },
    { id: "auth002", password: "authority456", name: "Authority 2", role: "Moderator" }
  ]
};

// Switch between volunteer and authority login forms
function switchTab(tabType) {
  if (tabType === 'volunteer') {
    document.getElementById('volunteerForm').style.display = 'block';
    document.getElementById('authorityForm').style.display = 'none';
    document.getElementById('volunteerTab').classList.add('active');
    document.getElementById('authorityTab').classList.remove('active');
  } else {
    document.getElementById('volunteerForm').style.display = 'none';
    document.getElementById('authorityForm').style.display = 'block';
    document.getElementById('volunteerTab').classList.remove('active');
    document.getElementById('authorityTab').classList.add('active');
  }
}

// Handle volunteer login
function loginVolunteer() {
  const id = document.getElementById('volunteerId').value;
  const password = document.getElementById('volunteerPassword').value;
  const statusElement = document.getElementById('status');
  
  if (!id || !password) {
    statusElement.innerText = "Please enter your ID and password";
    statusElement.className = "status-message error";
    return;
  }
  
  const volunteer = users.volunteers.find(v => v.id === id && v.password === password);
  
  if (volunteer) {
    if (volunteer.isVerified) {
      // Store login info in session storage
      sessionStorage.setItem('userType', 'volunteer');
      sessionStorage.setItem('userId', volunteer.id);
      sessionStorage.setItem('userName', volunteer.name);
      
      statusElement.innerText = "Login successful! Redirecting to map...";
      statusElement.className = "status-message success";
      
      // Redirect to map page after short delay
      setTimeout(() => {
        window.location.href = "map.html";
      }, 1500);
    } else {
      statusElement.innerText = "Your volunteer account is pending verification";
      statusElement.className = "status-message warning";
    }
  } else {
    statusElement.innerText = "Invalid ID or password";
    statusElement.className = "status-message error";
  }
}

// Handle authority login
function loginAuthority() {
  const id = document.getElementById('authorityId').value;
  const password = document.getElementById('authorityPassword').value;
  const statusElement = document.getElementById('status');
  
  if (!id || !password) {
    statusElement.innerText = "Please enter your ID and password";
    statusElement.className = "status-message error";
    return;
  }
  
  const authority = users.authorities.find(a => a.id === id && a.password === password);
  
  if (authority) {
    // Store login info in session storage
    sessionStorage.setItem('userType', 'authority');
    sessionStorage.setItem('userId', authority.id);
    sessionStorage.setItem('userName', authority.name);
    sessionStorage.setItem('role', authority.role);
    
    statusElement.innerText = "Authority login successful! Redirecting to control panel...";
    statusElement.className = "status-message success";
    
    // Redirect to map page after short delay (would be authority dashboard in full implementation)
    setTimeout(() => {
      window.location.href = "map.html";
    }, 1500);
  } else {
    statusElement.innerText = "Invalid authority credentials";
    statusElement.className = "status-message error";
  }
}

// Check if user is already logged in on page load
window.onload = function() {
  const userType = sessionStorage.getItem('userType');
  if (userType) {
    // User is already logged in, redirect appropriately
    window.location.href = "map.html";
  }
};