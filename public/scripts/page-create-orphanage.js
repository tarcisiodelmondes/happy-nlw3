const map = L.map("mapid").setView(
  [-15.831067614739927, -47.967360019683845],
  13
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
  iconUrl: "./images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

// Create end add marker
let marker;

map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;
  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// adiciona o campo de foto
function addPhotoField() {
  const container = document.querySelector("#images");
  const fieldsContainer = document.querySelectorAll(".new-upload");
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  const input = newFieldContainer.children[0];

  if (!input.value) return;

  input.value = "";
  container.appendChild(newFieldContainer);
}

//liimpa e deleta os campos
function deleteField(event) {
  const span = event.currentTarget;
  const fieldsContainer = document.querySelectorAll(".new-upload");
  if (fieldsContainer.length <= 1) {
    span.parentNode.children[0].value = "";
    return;
  }
  span.parentNode.remove();
}

// select yes or not
function toggleSelect(event) {
  document
    .querySelectorAll(".button-select button")
    .forEach((button) => button.classList.remove("active"));

  const button = event.currentTarget;
  button.classList.add("active");

  const input = document.querySelector("[name=open_on_weekends]");
  input.value = button.dataset.value;
}

validate = (event) => {
  const markerMap = document.querySelectorAll(".map-container input");
  const lat = markerMap[0].value;
  const lng = markerMap[1].value;
  const result = !lat && !lng ? false : true;
  if (result) {
    return;
  }
  event.preventDefault();
  alert("Selecione um ponto no mapa");
};

//

const fields = document.querySelectorAll("[required]");

function customValidation(event) {
  let field = event.target;
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (error !== "customError" && field.validity[error]) {
        foundError = true;
      }
    }
    return foundError;
  }

  const error = verifyErrors();
  error
    ? field.setCustomValidity("Esse campo está vazio")
    : field.setCustomValidity("");
}

for (let field of fields) {
  field.addEventListener("invalid", customValidation);
}
