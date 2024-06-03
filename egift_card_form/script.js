// Add an event listener to the radio group. When a radio button is selected,
// the value of the selected radio button is assigned to the customAmount input field.
document.querySelector(".radio-group").addEventListener("change", function (e) {
  document.querySelector("#customAmount").value = e.target.value;
});

// Add an event listener to the customAmount input field. When a value is entered,
// all radio buttons in the radio group are deselected.
document.querySelector("#customAmount").addEventListener("input", function () {
  let radios = document.querySelectorAll('.radio-group input[type="radio"]');
  radios.forEach((radio) => (radio.checked = false));
});

// Get the radio buttons and the email input fields
let sendToRecipient = document.getElementById("sendToRecipient");
let sendToMe = document.getElementById("sendToMe");
let emailInputs = document.querySelector(".email-inputs");

// Add event listeners to the radio buttons. When a radio button is selected,
// the toggleEmailInputs function is called.
sendToRecipient.addEventListener("change", toggleEmailInputs);
sendToMe.addEventListener("change", toggleEmailInputs);

// Function to enable or disable the email input fields based on the selected radio button.
// If sendToRecipient is selected, the email input fields are visible and enabled.
// If sendToMe is selected, the email input fields are hidden and disabled.
function toggleEmailInputs() {
  if (sendToRecipient.checked) {
    emailInputs.style.visibility = "visible";
    emailInputs.style.height = "auto";
    let inputs = emailInputs.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = false));
  } else if (sendToMe.checked) {
    emailInputs.style.visibility = "hidden";
    emailInputs.style.height = "0";
    let inputs = emailInputs.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = true));
  }
}

// Call the function once to set the initial state of the email input fields
toggleEmailInputs();

// CARDS
const buttons = document.querySelectorAll(".select-btn");
const selectedCardInput = document.querySelector("#selectedCard");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Reset all buttons to "Select" and remove selected class from cards
    buttons.forEach((btn) => {
      btn.textContent = "Select";
      btn.parentElement.classList.remove("selected");
    });

    // Set the clicked button to "Selected" and add selected class to card
    this.textContent = "Selected";
    this.parentElement.classList.add("selected");

    // Set the value of the hidden input field to the src of the selected card's image
    // When the form is submitted, the selected card's image source URL will be included in the form data.
    selectedCardInput.value = this.previousElementSibling.src;
  });
});

// Get all the input fields
const inputs = document.querySelectorAll(".input-group input");

inputs.forEach((input) => {
  // Add event listener for focus event
  input.addEventListener("focus", function () {
    // Set the label text to the placeholder text
    this.nextElementSibling.textContent = this.placeholder;
    // Clear the placeholder text
    this.placeholder = "";
  });

  // Add event listener for blur event
  input.addEventListener("blur", function () {
    // If the input field is not filled, reset the placeholder and label text
    if (this.value === "") {
      this.placeholder = this.nextElementSibling.textContent;
      this.nextElementSibling.textContent = "";
    }
  });
});

// PREVIEW IMAGES
function openPreview(previewDiv) {
  let imageSrc = previewDiv.getAttribute("data-preview-src");

  // Create a new div for the preview
  let previewPopup = document.createElement("div");
  previewPopup.className = "preview-popup";

  // Create an img element for the preview image
  let previewImg = document.createElement("img");
  previewImg.src = imageSrc;
  previewPopup.appendChild(previewImg);

  // Add the preview div to the body
  document.body.appendChild(previewPopup);

  // Add a click event to the preview div to close the preview
  previewPopup.addEventListener("click", function () {
    document.body.removeChild(previewPopup);
  });
}

// SELECT BUTTONS
document.querySelectorAll(".select-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    // Reset all buttons
    document.querySelectorAll(".select-btn").forEach(function (btn) {
      btn.classList.remove("selected");
    });

    // Style the clicked button
    this.classList.add("selected");
  });
});

// INPUT FIELDS NAME AND RECIPIENT NAME
document.querySelectorAll(".form-group input").forEach(function (input) {
  input.addEventListener("focus", function () {
    this.nextElementSibling.textContent = this.placeholder;
    this.placeholder =
      this.id === "from"
        ? "Please enter your name"
        : "Please enter the recipient's name";
  });

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.placeholder = this.nextElementSibling.textContent;
      this.nextElementSibling.textContent = "";
    }
  });
});

// SELECT A CARD BEFORE YOU SUBMIT THE FORM
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  // Check if a card is selected
  const selectedCard = document.querySelector(".selected");

  if (!selectedCard) {
    // Prevent form from submitting
    e.preventDefault();

    // Create a modal
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";
    modal.style.display = "flex"; // Add this
    modal.style.justifyContent = "center"; // Add this
    modal.style.alignItems = "center"; // Add this

    // Create a modal content
    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "30%"; // Adjust the width of the modal content
    modalContent.style.textAlign = "center"; // Center the text

    // Create a text node for the error message
    const text = document.createTextNode(
      "Please select a card design before adding it to the cart."
    );
    modalContent.appendChild(text);
    modalContent.style.color = "red"; // Change the color of the text to red

    // Append the modal content to the modal
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Remove the modal when clicked anywhere outside the modal content
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
});

// Get the email input fields and error message elements
const emailInput = document.getElementById("email");
const confirmEmailInput = document.getElementById("confirmEmail");
const emailError = document.getElementById("emailError");
const confirmEmailError = document.getElementById("confirmEmailError");

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add an input event listener to the email input field
emailInput.addEventListener("input", function () {
  if (!emailRegex.test(this.value)) {
    emailError.textContent = "Please enter a valid email.";
  } else {
    emailError.textContent = "";
  }
});

// Add an input event listener to the confirm email input field
confirmEmailInput.addEventListener("input", function () {
  if (!emailRegex.test(this.value)) {
    confirmEmailError.textContent = "Please enter a valid email.";
  } else {
    confirmEmailError.textContent = "";
  }
});

// CONFIRM EMAILS MATCH
let addToCartButton;
buttons.forEach((button) => {
  if (button.textContent === "Add to cart") {
    addToCartButton = button;
  }
});

// Add an input event listener to the confirm email input field
confirmEmailInput.addEventListener("input", function () {
  if (!emailRegex.test(this.value)) {
    confirmEmailError.textContent = "Please enter a valid email.";
  } else if (this.value !== emailInput.value) {
    confirmEmailError.textContent = "Emails do not match.";
  } else {
    confirmEmailError.textContent = "";
  }
});

// Add a click event listener to the "Add to cart" button
addToCartButton.addEventListener("click", function (event) {
  if (emailInput.value !== confirmEmailInput.value) {
    event.preventDefault(); // Prevent button click action
    confirmEmailError.textContent = "Emails do not match.";
  }
});
