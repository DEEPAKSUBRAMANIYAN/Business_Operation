document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons on boot
  if (window.lucide) {
    lucide.createIcons();
  }

  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const eyeIcon = document.getElementById("eye-icon");
  const submitBtn = document.getElementById("btn-submit");
  const btnText = submitBtn.querySelector(".btn-text");
  const spinner = document.getElementById("spinner");
  const errorBanner = document.getElementById("error-banner");

  // State preview control buttons
  const toggleErrorBtn = document.getElementById("toggle-error-state");
  const toggleLoadingBtn = document.getElementById("toggle-loading-state");

  // 1. Password Visibility Toggle
  togglePasswordBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Switch icon between eye and eye-off
    eyeIcon.setAttribute("data-lucide", isPassword ? "eye-off" : "eye");
    lucide.createIcons();
  });

  // 2. Form Submission simulation
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setLoadingState(true);
    errorBanner.classList.add("hidden");

    setTimeout(() => {
      setLoadingState(false);
      // Demo validation check
      if (!emailInput.value || !passwordInput.value) {
        showError("Please fill in both email and password.");
      } else {
        // Successful login mock
        alert(`Authenticated successfully as: ${emailInput.value}`);
      }
    }, 1200);
  });

  // 3. Preview States Handlers
  toggleErrorBtn.addEventListener("click", () => {
    errorBanner.classList.toggle("hidden");
  });

  toggleLoadingBtn.addEventListener("click", () => {
    const isLoading = !spinner.classList.contains("hidden");
    setLoadingState(!isLoading);
  });

  // Helper function: Loading state
  function setLoadingState(loading) {
    if (loading) {
      btnText.classList.add("hidden");
      spinner.classList.remove("hidden");
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.85";
    } else {
      btnText.classList.remove("hidden");
      spinner.classList.add("hidden");
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  }

  // Helper function: Show error
  function showError(msg) {
    const msgElement = document.getElementById("error-message");
    if (msgElement) msgElement.textContent = msg;
    errorBanner.classList.remove("hidden");
  }
});