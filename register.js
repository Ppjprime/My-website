// Functions for the enhanced registration page

// Send OTP for verification
function sendOTP(type) {
    alert(type.toUpperCase() + " OTP sent!");
    document.getElementById(type + "Otp").style.display = "block";
    document.getElementById(type + "Otp").focus();
}

// Basic validation functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    // Basic validation for 10-digit phone numbers
    const regex = /^\d{10}$/;
    return regex.test(phone);
}

function validateAadhaar(aadhaar) {
    // Basic validation for 12-digit Aadhaar numbers
    const regex = /^\d{12}$/;
    return regex.test(aadhaar);
}

function validatePassword(password) {
    // At least 8 characters, with at least one uppercase letter, 
    // one lowercase letter, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Register volunteer
function registerVolunteer() {
    // Get form values
    const fullName = document.getElementById("fullName").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const aadhaar = document.getElementById("aadhaar").value;
    const volunteerType = document.getElementById("volunteerType").value;
    const organization = document.getElementById("organization").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsAgree = document.getElementById("termsAgree").checked;
    
    const statusElement = document.getElementById("status");
    
    // Validate required fields
    if (!fullName || !dob || !gender || !phone || !email || !address || !aadhaar || 
        !volunteerType || !password || !confirmPassword) {
        statusElement.innerText = "Please fill all required fields";
        statusElement.className = "status-message error";
        return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
        statusElement.innerText = "Please enter a valid email address";
        statusElement.className = "status-message error";
        return;
    }
    
    // Validate phone format
    if (!validatePhone(phone)) {
        statusElement.innerText = "Please enter a valid 10-digit phone number";
        statusElement.className = "status-message error";
        return;
    }
    
    // Validate Aadhaar format
    if (!validateAadhaar(aadhaar)) {
        statusElement.innerText = "Please enter a valid 12-digit Aadhaar number";
        statusElement.className = "status-message error";
        return;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        statusElement.innerText = "Password must be at least 8 characters with uppercase, lowercase, number and special character";
        statusElement.className = "status-message error";
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        statusElement.innerText = "Passwords do not match";
        statusElement.className = "status-message error";
        return;
    }
    
    // Check terms agreement
    if (!termsAgree) {
        statusElement.innerText = "You must agree to the Terms of Service";
        statusElement.className = "status-message error";
        return;
    }
    
    // If all validations pass, proceed with registration
    // In a real application, you would submit this data to a server
    
    // For demo purposes, we'll just show a success message
    statusElement.innerText = "✔️ Registration Complete. Your application will be reviewed and you'll receive a verification call in 7 working days.";
    statusElement.className = "status-message success";
    
    // Generate a volunteer ID for demo purposes
    const volunteerId = "VOL" + Math.floor(1000 + Math.random() * 9000);
    
    // Show the volunteer ID
    setTimeout(() => {
        statusElement.innerText += `\n\nYour temporary Volunteer ID is: ${volunteerId}\n\nPlease take note of this ID. You can use it to log in after your verification is complete.`;
    }, 1500);
}