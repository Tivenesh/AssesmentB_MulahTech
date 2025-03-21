function validatePhone() {
    const phoneInput = document.getElementById("phoneNumber").value;
    const phoneError = document.getElementById("phoneError");
    
    // Check if input is numerical
    if (!/^\d+$/.test(phoneInput)) {
        phoneError.style.display = "block";
        return;
    }
    
    // Check if the phone number is the specific allowed number
    if (phoneInput === "173527250") {
        localStorage.setItem("phone", "+60" + phoneInput);
        window.location.href = "register.html";
    } else {
        phoneError.style.display = "block";
    }
}

function validateRegistration() {
    const name = document.getElementById("name").value;
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value;
    const noEmail = document.getElementById("noEmail").checked;
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("nameError").style.display = "none";
    }
    
    // Validate birthday
    if (!day || !month || !year) {
        document.getElementById("birthdayError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("birthdayError").style.display = "none";
    }
    
    // Validate email
    if (!noEmail && (!email || !email.includes("@"))) {
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("emailError").style.display = "none";
    }
    
    if (isValid) {
        localStorage.setItem("name", name);
        localStorage.setItem("birthday", `${day}/${month}/${year}`);
        localStorage.setItem("email", noEmail ? "No email provided" : email);
        window.location.href = "summary.html";
    }
}

function toggleEmail() {
    const emailField = document.getElementById("email");
    const noEmail = document.getElementById("noEmail").checked;
    
    if (noEmail) {
        emailField.disabled = true;
        emailField.value = "";
        document.getElementById("emailError").style.display = "none";
    } else {
        emailField.disabled = false;
    }
}

// Add event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
    // For field validation
    const nameInput = document.getElementById("name");
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value) {
                document.getElementById("nameError").style.display = "none";
            }
        });
    }
    
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    
    if (dayInput && monthInput && yearInput) {
        const birthdayInputs = [dayInput, monthInput, yearInput];
        birthdayInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (dayInput.value && monthInput.value && yearInput.value) {
                    document.getElementById("birthdayError").style.display = "none";
                }
            });
        });
    }
    
    const emailInput = document.getElementById("email");
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value && this.value.includes('@')) {
                document.getElementById("emailError").style.display = "none";
            }
        });
    }
    
    // For "No email address" checkbox
    const noEmailCheckbox = document.getElementById("noEmail");
    if (noEmailCheckbox) {
        noEmailCheckbox.addEventListener('change', toggleEmail);
    }
    
    // Populate summary page if we're on that page
    if (window.location.pathname.includes('summary.html')) {
        document.getElementById('displayPhone').textContent = localStorage.getItem('phone') || '';
        document.getElementById('displayName').textContent = localStorage.getItem('name') || '';
        document.getElementById('displayBirthday').textContent = localStorage.getItem('birthday') || '';
        document.getElementById('displayEmail').textContent = localStorage.getItem('email') || '';
    }
});