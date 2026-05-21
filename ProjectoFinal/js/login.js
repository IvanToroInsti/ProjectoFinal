const params = new URLSearchParams(window.location.search);

const errorUsuari = document.getElementById("errorUsuari");
const errorPass = document.getElementById("errorPass");

const usuariInput = document.getElementById("usuari");
const passInput = document.getElementById("pass");


if (params.get("error") === "usuari") {

  errorUsuari.classList.remove("hidden");

  usuariInput.classList.add(
    "border-red-600",
    "animate-pulse"
  );
}

if (params.get("error") === "pass") {

  errorPass.classList.remove("hidden");

  passInput.classList.add(
    "border-red-600",
    "animate-pulse"
  );
}

usuariInput.addEventListener("input", () => {

  errorUsuari.classList.add("hidden");

  usuariInput.classList.remove(
    "border-red-600",
    "animate-pulse"
  );
});

passInput.addEventListener("input", () => {

  errorPass.classList.add("hidden");

  passInput.classList.remove(
    "border-red-600",
    "animate-pulse"
  );
});