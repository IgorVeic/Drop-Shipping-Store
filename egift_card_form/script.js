document.addEventListener("DOMContentLoaded", function () {
  setupRadioGroupListeners();
  setupCustomAmountListener();
  setupDeliveryOptionListeners();
  setupCardSelection();
  setupInputFieldFocus();
  setupFormValidation();
  setupEmailValidation();
  setupAmountValidation();
  initializeEmailInputs();
});

// Setup listeners for the radio group
function setupRadioGroupListeners() {
  const radioGroup = document.querySelector(".radio-group");
  if (radioGroup) {
    radioGroup.addEventListener("change", function (e) {
      document.querySelector("#customAmount").value = e.target.value;
    });
  }
}

// Setup listener for the custom amount input
function setupCustomAmountListener() {
  const customAmountInput = document.querySelector("#customAmount");
  if (customAmountInput) {
    customAmountInput.addEventListener("input", function () {
      let radios = document.querySelectorAll(
        '.radio-group input[type="radio"]'
      );
      radios.forEach((radio) => (radio.checked = false));
    });
  }
}

// Setup listeners for delivery options
function setupDeliveryOptionListeners() {
  const sendToRecipient = document.getElementById("sendToRecipient");
  const sendToMe = document.getElementById("sendToMe");

  if (sendToRecipient && sendToMe) {
    sendToRecipient.addEventListener("change", toggleEmailInputs);
    sendToMe.addEventListener("change", toggleEmailInputs);
  }
}

// Toggle email inputs based on delivery option
function toggleEmailInputs() {
  const emailInputs = document.querySelector(".email-inputs");

  if (!emailInputs) return;

  const inputs = emailInputs.querySelectorAll("input");
  if (document.getElementById("sendToRecipient").checked) {
    emailInputs.style.visibility = "visible";
    emailInputs.style.height = "auto";
    inputs.forEach((input) => (input.disabled = false));
  } else {
    emailInputs.style.visibility = "hidden";
    emailInputs.style.height = "0";
    inputs.forEach((input) => (input.disabled = true));
  }
}

// Initialize email inputs state
function initializeEmailInputs() {
  toggleEmailInputs();
}

// Setup card selection functionality
function setupCardSelection() {
  const buttons = document.querySelectorAll(".select-btn");
  const selectedCardInput = document.querySelector("#selectedCard");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const parentCard = this.parentElement;
      const isSelected = parentCard.classList.contains("selected");

      // Reset all buttons to "Select" and remove selected class from cards
      buttons.forEach((btn) => {
        btn.textContent = "Select";
        btn.parentElement.classList.remove("selected");
      });

      if (!isSelected) {
        // Set the clicked button to "Selected" and add selected class to card
        this.textContent = "Selected";
        parentCard.classList.add("selected");
        // Set the value of the hidden input field to the src of the selected card's image
        selectedCardInput.value = this.previousElementSibling.src;
      } else {
        // Deselect the card if it was already selected
        selectedCardInput.value = "";
      }
    });
  });
}

// Setup focus and blur effects for input fields
function setupInputFieldFocus() {
  const inputs = document.querySelectorAll(".form-group input");

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.nextElementSibling.textContent = this.placeholder;
      this.placeholder = "";
    });

    input.addEventListener("blur", function () {
      if (this.value === "") {
        this.placeholder = this.nextElementSibling.textContent;
        this.nextElementSibling.textContent = "";
      }
    });
  });
}

// Setup form validation for card selection
function setupFormValidation() {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    const selectedCard = document.querySelector(".selected");

    if (!selectedCard) {
      e.preventDefault();
      showModal("Please select a card design before adding it to the cart.");
    }
  });
}

// Show modal with error message
function showModal(message) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const text = document.createTextNode(message);
  modalContent.appendChild(text);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  window.onclick = function (event) {
    if (event.target == modal) {
      document.body.removeChild(modal);
    }
  };
}

// Setup email validation
function setupEmailValidation() {
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const emailError = document.getElementById("emailError");
  const confirmEmailError = document.getElementById("confirmEmailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput && confirmEmailInput && emailError && confirmEmailError) {
    emailInput.addEventListener("input", function () {
      validateEmail(emailInput, emailError, emailRegex);
    });

    confirmEmailInput.addEventListener("input", function () {
      validateEmail(confirmEmailInput, confirmEmailError, emailRegex);
      validateMatchingEmails(emailInput, confirmEmailInput, confirmEmailError);
    });

    document.querySelector("form").addEventListener("submit", function (event) {
      if (emailInput.value !== confirmEmailInput.value) {
        event.preventDefault();
        confirmEmailError.textContent = "Emails do not match.";
      }
    });
  }
}

// Validate email format
function validateEmail(input, errorElement, regex) {
  if (!regex.test(input.value)) {
    errorElement.textContent = "Please enter a valid email.";
  } else {
    errorElement.textContent = "";
  }
}

// Validate matching emails
function validateMatchingEmails(emailInput, confirmEmailInput, errorElement) {
  if (confirmEmailInput.value !== emailInput.value) {
    errorElement.textContent = "Emails do not match.";
  } else {
    errorElement.textContent = "";
  }
}

// Setup amount validation
function setupAmountValidation() {
  const amountRadios = document.querySelectorAll('input[name="amount"]');
  const customAmountInput = document.getElementById("customAmount");
  const addToCartButton = document.querySelector('button[type="submit"]');
  const amountError = document.createElement("p");
  amountError.id = "amountError";
  amountError.style.color = "red";
  customAmountInput.parentElement.appendChild(amountError);

  function checkAmount() {
    let amountSelected = [...amountRadios].some((radio) => radio.checked);
    let customAmountEntered = customAmountInput.value !== "";

    if (amountSelected || customAmountEntered) {
      amountError.textContent = "";
      return true;
    } else {
      return false;
    }
  }

  amountRadios.forEach((radio) => {
    radio.addEventListener("input", checkAmount);
  });

  customAmountInput.addEventListener("input", checkAmount);

  addToCartButton.addEventListener("click", function (event) {
    if (!checkAmount()) {
      event.preventDefault();
      amountError.textContent = "Please select or choose an amount.";
    }
  });
}

// Setup preview functionality
function openPreview(previewDiv) {
  let imageSrc = previewDiv.getAttribute("data-preview-src");

  let previewPopup = document.createElement("div");
  previewPopup.className = "preview-popup";

  let previewImg = document.createElement("img");
  previewImg.src = imageSrc;
  previewPopup.appendChild(previewImg);

  document.body.appendChild(previewPopup);

  previewPopup.addEventListener("click", function () {
    document.body.removeChild(previewPopup);
  });
}
