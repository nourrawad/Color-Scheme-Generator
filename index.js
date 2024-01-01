let btn = document.getElementById("btn");
let inputColor = document.getElementById("input");
let scheme = document.getElementById("scheme");
let colorContainer = document.getElementById("color-container");

btn.addEventListener("click", function (event) {
  event.preventDefault();

  let colorHex = inputColor.value.replace("#", "");
  let selectedScheme = scheme.value;

  console.log(colorHex);
  console.log(selectedScheme);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorHex}&format=json&mode=${selectedScheme}&count=6`
  )
    .then((res) => {
      console.log("fetch response status", res.status);
      return res.json(); // Parse the response as JSON
    })
    .then((data) => {
      console.log(data);
      // Extract color values from the JSON data
      let colorValues = extractColorValuesFromJson(data);

      // Display color values
      displayColorValues(colorValues);
    })
    .catch((error) => {
      console.error("Error fetching color scheme:", error);
    });
});

function extractColorValuesFromJson(data) {
  // Extract color values from the JSON data
  let colorValues = [];

  // Check the structure of the JSON and adjust accordingly
  if (data && data.colors && data.colors.length > 0) {
    colorValues = data.colors.map((color) => ({
      hex: color.hex.value,
      name: color.name,
    }));
  }

  return colorValues;
}

function displayColorValues(colorValues) {
  // Clear existing content
  colorContainer.innerHTML = "";

  // Create color swatches and display them with hex codes
  colorValues.forEach((color) => {
    let colorSwatch = document.createElement("div");
    colorSwatch.style.backgroundColor = color.hex;
    colorSwatch.className = "color-swatch";
    colorContainer.appendChild(colorSwatch);

    let hexCode = document.createElement("div");
    hexCode.textContent = color.hex;
    colorContainer.appendChild(hexCode);
  });
}
