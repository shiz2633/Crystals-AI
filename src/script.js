function generateCrystal(event) {
  event.preventDefault();

  alert(
    "Your crystal is being generated! Please wait a few seconds for the image to appear.",
  );
}

let crystalFormElement = document.querySelector("#crystal-generator-form");
crystalFormElement.addEventListener("submit", generateCrystal);
