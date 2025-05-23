document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const adminUsername = "admin";
    const adminPassword = "admin";

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "listagem.html";
    } else {
        alert("Credenciais inválidas. Tente novamente.");
    }
});
