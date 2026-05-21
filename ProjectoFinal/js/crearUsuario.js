const params = new URLSearchParams(window.location.search);

const errorNom = document.getElementById("errorNom");
const errorEmail = document.getElementById("errorEmail");
const errorPass = document.getElementById("errorPass");

const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("pass");
const pass2Input = document.getElementById("pass2");


if (params.get("error") === "nom") {

  errorNom.classList.remove("hidden");

  nomInput.classList.add(
    "border-red-600",
    "animate-pulse"
  );
}


if (params.get("error") === "email") {

  errorEmail.classList.remove("hidden");

  emailInput.classList.add(
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

  pass2Input.classList.add(
    "border-red-600",
    "animate-pulse"
  );
}

nomInput.addEventListener("input", () => {

  errorNom.classList.add("hidden");

  nomInput.classList.remove(
    "border-red-600",
    "animate-pulse"
  );
});

emailInput.addEventListener("input", () => {

  errorEmail.classList.add("hidden");

  emailInput.classList.remove(
    "border-red-600",
    "animate-pulse"
  );
});

passInput.addEventListener("input", limpiarPassword);
pass2Input.addEventListener("input", limpiarPassword);

function limpiarPassword() {

  errorPass.classList.add("hidden");

  passInput.classList.remove(
    "border-red-600",
    "animate-pulse"
  );

  pass2Input.classList.remove(
    "border-red-600",
    "animate-pulse"
  );
}