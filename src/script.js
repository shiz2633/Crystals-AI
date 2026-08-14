function displayResults(response) {
  console.log("Crystal generated");

  let benefits = response.data.answer;

  benefits = benefits
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `• ${line.replace(/^[-•*]\s*/, "")}`)
    .join("\n");

  new Typewriter("#benefits", {
    strings: benefits,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function displayCrystalImage(response) {
  let imageElement = document.querySelector("#crystal-image");

  if (response.data.photos.length > 0) {
    let photo = response.data.photos[0];

    imageElement.innerHTML = `
      <img 
        src="${photo.src.large}"
        alt="${photo.alt}"
        class="crystal-image"
      />
      <p class="photo-credit">
        Photo by ${photo.photographer} on Pexels
      </p>
    `;
  } else {
    imageElement.innerHTML = "<p>No crystal image found.</p>";
  }
}

function generateCrystal(event) {
  event.preventDefault();

  let inputField = document.querySelector("#userInput");
  let benefitsElement = document.querySelector("#benefits");
  let imageElement = document.querySelector("#crystal-image");

  let crystalName = inputField.value.trim();

  let apiKey = "534da33b5ce367f43atb4e240d7d01o0";
  let pexelsApiKey = "dZGs9XRB6Ml3IqhtSfxcicC5clLRV3owouUig1rteh1aLweOMFrELiG0";

  benefitsElement.innerHTML = "Generating crystal...";
  imageElement.innerHTML = "Finding image...";

  // AI benefits
  let prompt = `Generate a short list of benefits of the ${crystalName} crystal.`;

  let context =
    "You are a crystal expert. Generate a short list of benefits of the specific crystal requested by the user. Use one bullet point for each benefit. Put every bullet point on its own line. List only the benefits. Do not include an introduction or conclusion.";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt,
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiUrl).then(displayResults);

  // Crystal image
  axios
    .get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        crystalName + " crystal",
      )}&per_page=1`,
      {
        headers: {
          Authorization: pexelsApiKey,
        },
      },
    )
    .then(displayCrystalImage)
    .catch(function () {
      imageElement.innerHTML = "";
    });
}

document
  .querySelector("#crystal-generator-form")
  .addEventListener("submit", generateCrystal);
