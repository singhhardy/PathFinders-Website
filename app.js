  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading, hide messages
      loading.style.display = "block";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";

      // Collect data from form
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
      };

      // Send request
      fetch("https://pb-backend-rho.vercel.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(response => {
        loading.style.display = "none";
        if (response.success) {
          sentMessage.style.display = "block";
          form.reset();
        } else {
          errorMessage.textContent = response.message || "Something went wrong.";
          errorMessage.style.display = "block";
        }
      })
      .catch(error => {
        console.error(error);
        loading.style.display = "none";
        errorMessage.textContent = "Something went wrong.";
        errorMessage.style.display = "block";
      });
    });
  });