window.onload = function () {
    var isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isAdminLoggedIn !== "true") {
        window.location.href = "login.html";
    } else {
        localStorage.removeItem("isAdminLoggedIn");
        loadUsers();
    }
};
