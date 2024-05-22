document.querySelector(".radio-group").addEventListener("change", function (e) {
  document.querySelector("#customAmount").value = e.target.value;
});

document.querySelector("#customAmount").addEventListener("input", function () {
  let radios = document.querySelectorAll('.radio-group input[type="radio"]');
  radios.forEach((radio) => (radio.checked = false));
});
