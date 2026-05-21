fetch("../php/admin_usuarios.php")
    .then(r => r.json())
    .then(data => {
        document.getElementById("users").innerHTML =
            data.map(u => `<p>${u.nom} (${u.rol})</p>`).join("");
    });

function addPoi() {

    const nom = document.getElementById("nom").value;
    const tipus = document.getElementById("tipus").value;
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;

    fetch("../php/admin_datos.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            nom,
            tipus,
            lat,
            lng
        })
    })
        .then(r => r.json())
        .then(res => {

            if (res.status === "ok") {
                mostrarMsg("msgAddPoi", "✔ " + res.message);
                document.getElementById("nom").value = "";
                document.getElementById("tipus").selectedIndex = 0;
                document.getElementById("lat").value = "";
                document.getElementById("lng").value = "";
                cargarPois();
            } else {
                mostrarMsg("msgAddPoi", "❌ " + res.message, "red");
            }

        })
        .catch(err => {
            console.error("ERROR FETCH:", err);
            mostrarMsg("msgAddPoi", "Error de servidor", "red");
        });
}


fetch("../php/admin_usuarios.php")
    .then(r => r.json())
    .then(data => {
        document.getElementById("users").innerHTML =
            data.map(u => `<p>${u.nom} (${u.rol})</p>`).join("");

        document.getElementById("userSelect").innerHTML =
            data
                .filter(u => u.rol !== "admin")
                .map(u => `<option value="${u.nom}">${u.nom}</option>`)
                .join("");
    });
function cargarUsuarios() {
    fetch("../php/admin_usuarios.php")
        .then(r => r.json())
        .then(data => {
            document.getElementById("users").innerHTML =
                data.map(u => `<p>${u.nom} (${u.rol})</p>`).join("");

            document.getElementById("userSelect").innerHTML =
                data
                    .filter(u => u.rol !== "admin")
                    .map(u => `<option value="${u.nom}">${u.nom}</option>`)
                    .join("");
        });
}

cargarUsuarios();

function deleteUser() {
    const nom = document.getElementById("userSelect").value;

    fetch("../php/admin_eliminar_usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "nom=" + encodeURIComponent(nom)
    })
        .then(r => r.text())
        .then(res => {
            mostrarMsg("msgUser", "✔ Usuario eliminado");
            cargarUsuarios();
        });
}
cargarUsuarios();
function cargarPois() {
    const tipo = document.getElementById("filterType").value;

    let url = "../php/admin_puntos.php";

    if (tipo) {
        url += "?tipus=" + encodeURIComponent(tipo);
    }

    fetch(url)
        .then(r => r.json())
        .then(data => {

            const filtrados = data.filter(p =>
                p.tipus !== "puerta" &&
                p.tipus !== "tribuna"
            );

            document.getElementById("poiSelect").innerHTML =
                filtrados.map(p =>
                    `<option value="${p.nom}">
                        ${p.nom} (${p.tipus})
                    </option>`
                ).join("");
        })
        .catch(err => console.error(err));
}

cargarPois();
function deletePoi() {
    const nom = document.getElementById("poiSelect").value;

    fetch("../php/admin_eliminar_datos.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "nom=" + encodeURIComponent(nom)
    })
        .then(r => r.json())
        .then(res => {

            if (res.status === "ok") {
                mostrarMsg("msgDeletePoi", "✔ " + res.message, "lightgreen");
                cargarPois(); // refresca lista
            } else {
                mostrarMsg("msgDeletePoi", "❌ " + res.message, "red");
            }

        })
        .catch(err => {
            console.error(err);
            mostrarMsg("msgDeletePoi", "Error de servidor", "red");
        });
}

function mostrarMsg(id, texto, color = "lightgreen") {
    const el = document.getElementById(id);
    el.textContent = texto;
    el.style.color = color;

    setTimeout(() => {
        el.textContent = "";
    }, 3000);
}