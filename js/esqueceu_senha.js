function togglePassword(inputId) {
    var passwordInput = document.getElementById(inputId);
    var togglePassword = passwordInput.nextElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Ocultar Senha";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Mostrar Senha";
    }
}

function sendResetCode() {
    var email = document.getElementById("forgotPasswordEmail").value;
    var storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email) {
        var resetCode = generateResetCode();
        localStorage.setItem('resetCode', resetCode);

        document.getElementById("resetCodeArea").style.display = "block";

        console.log("Código de redefinição enviado para " + email + ": " + resetCode);
    } else {
        alert("Email não encontrado.");
    }
}

function generateResetCode() {
    return Math.floor(1000 + Math.random() * 9000);
}

function resetPassword() {
    var resetCode = document.getElementById("resetCodeInput").value;
    var newPassword = document.getElementById("newPasswordInput").value;
    var confirmNewPassword = document.getElementById("confirmNewPasswordInput").value;
    var resetPasswordError = document.getElementById("resetPasswordError");
    var resetSuccessMessage = document.getElementById("resetSuccessMessage");
    var storedResetCode = localStorage.getItem('resetCode');

    if (resetCode === "" || newPassword === "" || confirmNewPassword === "") {
        resetPasswordError.textContent = "Todos os campos são obrigatórios!";
        return;
    }

    if (newPassword !== confirmNewPassword) {
        resetPasswordError.textContent = "As senhas não coincidem!";
        return;
    }

    if (resetCode !== storedResetCode) {
        resetPasswordError.textContent = "Código de redefinição inválido!";
        return;
    }

    var storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        storedUser.password = newPassword;
        localStorage.setItem('user', JSON.stringify(storedUser));
    }

    resetPasswordError.textContent = "";
    resetSuccessMessage.style.display = "block";
    document.getElementById("resetCodeArea").style.display = "none";
}

function returnToLogin() {
    window.location.href = "login.html";
}