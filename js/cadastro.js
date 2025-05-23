document.addEventListener('DOMContentLoaded', () => {
    // Função para alternar a visibilidade da senha
    function senha() {
        var passwordInput = document.getElementById("passwordInput");
        var togglePassword = document.querySelector(".toggle-password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Ocultar Senha";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Mostrar Senha";
        }
    }

    // Função para alternar a visibilidade da confirmação de senha
    function confirmaSenha() {
        var passwordInput2 = document.getElementById("passwordInput2");
        var togglePassword2 = document.querySelector(".toggle-password2");

        if (passwordInput2.type === "password") {
            passwordInput2.type = "text";
            togglePassword2.textContent = "Ocultar Senha";
        } else {
            passwordInput2.type = "password";
            togglePassword2.textContent = "Mostrar Senha";
        }
    }

    // Adiciona eventos aos botões de alternar visibilidade de senha
    document.querySelector(".toggle-password").addEventListener("click", senha);
    document.querySelector(".toggle-password2").addEventListener("click", confirmaSenha);

    // Função para cadastro de usuário
    function cadastrar(event) {
        event.preventDefault();
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var confirm_password = event.target.confirm_password.value;

        if (password !== confirm_password) {
            document.getElementById("passwordError").textContent = "As senhas não coincidem!";
            return;
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];

        var user = {
            firstname,
            lastname,
            email,
            password
        };

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    }

    // Adiciona evento ao formulário de cadastro
    document.getElementById("cadastroForm").addEventListener("submit", cadastrar);

    // Valida a confirmação da senha durante a digitação
    document.getElementById("passwordInput2").addEventListener("input", function () {
        var password1 = document.getElementById("passwordInput").value;
        var password2 = this.value;
        var passwordError = document.getElementById("passwordError");

        if (password1 !== password2) {
            passwordError.textContent = "As senhas não coincidem!";
        } else {
            passwordError.textContent = "";
        }
    });
});
