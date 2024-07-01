function toggleInvoice() {
  let invoiceForm = document.getElementById("invoiceForm");
  if (invoiceForm.style.display === "none") {
    invoiceForm.style.display = "block";
  } else {
    invoiceForm.style.display = "none";
  }
}

// Call toggleInvoice on page load to hide the form
window.onload = toggleInvoice;
