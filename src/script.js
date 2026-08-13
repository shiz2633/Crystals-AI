function generateCrystal(event) {
  event.preventDefault();

  new Typewriter("#results", {
    strings: "Generating crystal please wait...",
    autoStart: true,
    delay: 1,
    cursor: "",
  });

  resultsElement.innerHTML = "Generating crystal...";
}

document
  .querySelector("#crystal-generator-form")
  .addEventListener("submit", generateCrystal);
