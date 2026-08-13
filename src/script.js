function displayResults(response) {
  console.log("Crystal generated");

  let benefits = response.data.answer;

  benefits = benefits
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `• ${line.replace(/^[-•*]\s*/, "")}`)
    .join("\n");

  new Typewriter("#results", {
    strings: benefits,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateCrystal(event) {
  event.preventDefault();

  let inputField = document.querySelector("#userInput");
  let resultsElement = document.querySelector("#results");

  let apiKey = "534da33b5ce367f43atb4e240d7d01o0";

  let prompt = `Generate a short list of benefits of the ${inputField.value} crystal.`;

  let context =
    "You are a crystal expert. Generate a short list of benefits of the specific crystal requested by the user. Use one bullet point for each benefit. Put every bullet point on its own line. List only the benefits. Do not include an introduction or conclusion.";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt,
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  resultsElement.innerHTML = "Generating crystal...";

  console.log("Generating crystal...");
  console.log(`Prompt: ${prompt}`);

  axios.get(apiUrl).then(displayResults);
}

document
  .querySelector("#crystal-generator-form")
  .addEventListener("submit", generateCrystal);
