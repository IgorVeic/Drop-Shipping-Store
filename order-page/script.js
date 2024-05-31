document.getElementById("invoice").addEventListener("change", function () {
  var invoiceForm = document.getElementById("invoiceForm");
  if (this.checked) {
    invoiceForm.style.display = "block";
  } else {
    invoiceForm.style.display = "none";
  }
});
