document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ==============================
    // ELEMENTS
    // ==============================
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("toggle-password");
    const eyeIcon = document.getElementById("eye-icon");
    const submitBtn = document.getElementById("btn-submit");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = document.getElementById("spinner");
    const errorBanner = document.getElementById("error-banner");
    const toggleErrorBtn = document.getElementById("toggle-error-state");
    const toggleLoadingBtn = document.getElementById("toggle-loading-state");

    // ==============================
    // PASSWORD VISIBILITY
    // ==============================
    togglePasswordBtn.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";

        eyeIcon.setAttribute(
            "data-lucide",
            isPassword ? "eye-off" : "eye"
        );

        lucide.createIcons();
    });

    // ==============================
    // LOGIN
    // ==============================
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorBanner.classList.add("hidden");

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Basic frontend validation
        if (!email || !password) {
            showError("Please fill in both email and password.");
            return;
        }

        setLoadingState(true);

        try {
            // ==============================
            // API REQUEST
            // ==============================
            const response = await fetch(
                ApiEndpoint.baseUrl + ApiEndpoint.login,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            // ==============================
            // READ RESPONSE SAFELY
            // ==============================
            let data = null;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                try {
                    data = await response.json();
                } catch {
                    data = null;
                }
            } else {
                // If the backend sent plain text or HTML (e.g., standard Spring error page)
                try {
                    const rawText = await response.text();
                    if (rawText) {
                        data = { message: rawText };
                    }
                } catch {
                    data = null;
                }
            }

            // ==============================
            // LOGIN FAILED
            // ==============================
            
            if (!response.ok) {
                // Wrong password / wrong email usually triggers 401 or 403
                if (response.status === 401 || response.status === 403) {
                    showError(
                        data?.message || 
                        "Invalid email or password. Please try again."
                    );
                    return;
                }

                if (response.status === 404) {
                    showError("Account not found. Please register first.");
                    return;
                }

                if (response.status >= 500) {
                    showError("Server error. Please try again later.");
                    return;
                }

                showError(
                    data?.message ||
                    data?.error ||
                    "Unable to sign in. Please try again."
                );
                return;
            }

            // Ensure we actually got valid payload
            if (!data) {
                showError("Invalid or empty response format received from the server.");
                return;
            }

            // ==============================
            // LOGIN SUCCESS
            // ==============================
            console.log("Login successful");
            console.log("Login response:", data);

            // Save JWT token
            localStorage.setItem("jwtToken", data.token || "");

            // Save logged-in user information
            localStorage.setItem("userId", data.userId || "");
            localStorage.setItem("userName", data.name || "");
            localStorage.setItem("userEmail", data.email || "");

           
         window.location.href = "/bizflow/frontend/screen/navigation/nav_screen.html#dashboard";

        } catch (error) {
            console.error("Login error:", error);
            showError("Unable to connect to the server. Please make sure the backend is running.");
        } finally {
            setLoadingState(false);
        }
    });

    // ==============================
    // PREVIEW ERROR BUTTON
    // ==============================
    if (toggleErrorBtn) {
        toggleErrorBtn.addEventListener("click", () => {
            errorBanner.classList.toggle("hidden");
        });
    }

    // ==============================
    // PREVIEW LOADING BUTTON
    // ==============================
    if (toggleLoadingBtn) {
        toggleLoadingBtn.addEventListener("click", () => {
            const isLoading = !spinner.classList.contains("hidden");
            setLoadingState(!isLoading);
        });
    }

    // ==============================
    // LOADING STATE
    // ==============================
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

    // ==============================
    // SHOW ERROR
    // ==============================
    function showError(message) {
        const messageElement = document.getElementById("error-message");
        if (messageElement) {
            messageElement.textContent = message;
        }
        errorBanner.classList.remove("hidden");
    }
});