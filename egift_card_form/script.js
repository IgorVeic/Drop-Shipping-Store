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

    // Alert the user
    alert("Please select a card before submitting the form.");
  }
});
