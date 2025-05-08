document.addEventListener("DOMContentLoaded", function () {
  // ========== Event Handling ========== //

  // Click Event
  const clickBox = document.getElementById("click-box");
  clickBox.addEventListener("click", function () {
    this.style.backgroundColor = getRandomColor();
    this.classList.add("pulse");
    setTimeout(() => this.classList.remove("pulse"), 500);
  });

  // Hover Event
  const hoverBox = document.getElementById("hover-box");
  hoverBox.addEventListener("mouseenter", function () {
    this.querySelector("h3").textContent = "Mouse Entered!";
  });
  hoverBox.addEventListener("mouseleave", function () {
    this.querySelector("h3").textContent = "Hover Over Me";
  });

  // Keypress Event
  const keypressBox = document.getElementById("keypress-box");
  const keyDisplay = keypressBox.querySelector(".key-display");
  keypressBox.addEventListener("keydown", function (e) {
    keyDisplay.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    this.style.backgroundColor = getRandomColor();
  });

  // Secret Events (Double-click and Long Press)
  const secretBox = document.getElementById("secret-box");
  let pressTimer;
  const secretReveal = document.createElement("div");
  secretReveal.className = "secret-reveal";
  secretReveal.textContent = "🎉 Secret Unlocked! 🎉";
  secretBox.appendChild(secretReveal);

  // Double-click
  secretBox.addEventListener("dblclick", function () {
    secretReveal.classList.add("show");
    setTimeout(() => secretReveal.classList.remove("show"), 2000);
  });

  // Long press
  secretBox.addEventListener("mousedown", function () {
    pressTimer = setTimeout(() => {
      secretReveal.textContent = "🔓 Long Press Detected! 🔓";
      secretReveal.classList.add("show");
      setTimeout(() => secretReveal.classList.remove("show"), 2000);
    }, 1000);
  });

  secretBox.addEventListener("mouseup", function () {
    clearTimeout(pressTimer);
  });

  secretBox.addEventListener("mouseleave", function () {
    clearTimeout(pressTimer);
  });

  // ========== Interactive Elements ========== //

  // Color Changer
  const colorBtn = document.getElementById("color-btn");
  const colorDisplay = document.getElementById("color-display");
  colorBtn.addEventListener("click", function () {
    const newColor = getRandomColor();
    colorDisplay.style.backgroundColor = newColor;
    colorDisplay.textContent = newColor;
  });

  // Image Gallery
  const galleryImages = document.querySelectorAll(".gallery-container img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentImageIndex = 0;

  function showImage(index) {
    galleryImages.forEach((img) => img.classList.remove("active"));
    galleryImages[index].classList.add("active");
  }

  prevBtn.addEventListener("click", function () {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
  });

  // Auto-advance gallery every 3 seconds
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
  }, 3000);

  // Accordion
  const accordionBtns = document.querySelectorAll(".accordion-btn");
  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      const isOpen = content.style.maxHeight;

      // Close all other accordion items
      accordionBtns.forEach((otherBtn) => {
        if (otherBtn !== this) {
          otherBtn.classList.remove("active");
          otherBtn.nextElementSibling.style.maxHeight = null;
          otherBtn.querySelector("span").textContent = "+";
        }
      });

      // Toggle current item
      if (isOpen) {
        content.style.maxHeight = null;
        this.querySelector("span").textContent = "+";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        this.querySelector("span").textContent = "-";
      }
    });
  });

  // ========== Form Validation ========== //
  const form = document.getElementById("user-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const formMessage = document.getElementById("form-message");

  // Real-time validation
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      formMessage.textContent = "Form submitted successfully!";
      formMessage.style.color = "#2ecc71";
      formMessage.style.backgroundColor = "rgba(46, 204, 113, 0.1)";

      // Reset form
      setTimeout(() => {
        form.reset();
        formMessage.textContent = "";
        formMessage.style.backgroundColor = "transparent";

        // Reset password rules
        document.querySelectorAll(".password-rules li").forEach((li) => {
          li.classList.remove("valid");
        });
      }, 2000);
    } else {
      formMessage.textContent = "Please fix the errors before submitting.";
      formMessage.style.color = "#e74c3c";
      formMessage.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
    }
  });

  // Validation functions
  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameInput.classList.add("shake");
      setTimeout(() => nameInput.classList.remove("shake"), 500);
      return false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters";
      return false;
    } else {
      nameError.textContent = "";
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === "") {
      emailError.textContent = "Email is required";
      return false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    let isValid = true;

    // Check length
    const lengthRule = document.getElementById("length-rule");
    if (password.length >= 8) {
      lengthRule.classList.add("valid");
    } else {
      lengthRule.classList.remove("valid");
      isValid = false;
    }

    // Check for number
    const numberRule = document.getElementById("number-rule");
    if (/\d/.test(password)) {
      numberRule.classList.add("valid");
    } else {
      numberRule.classList.remove("valid");
      isValid = false;
    }

    // Check for special character
    const specialRule = document.getElementById("special-rule");
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      specialRule.classList.add("valid");
    } else {
      specialRule.classList.remove("valid");
      isValid = false;
    }

    if (!isValid) {
      passwordError.textContent = "Password does not meet requirements";
    } else {
      passwordError.textContent = "";
    }

    return isValid;
  }

  // Helper function
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
