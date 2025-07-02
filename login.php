<?php session_start(); ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login APAE</title>
    <link rel="stylesheet" href="css/rodape.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="shortcut icon" href="img/autismo_logo.png" type="image/x-icon">
</head>

<body>
    <header id="navbar-placeholder"></header>
    <main class="login-card">
        <div class="card">
            <img src="img/APAE-Horizontal-png.png" alt="APAE">
            <?php if (isset($_SESSION['erro'])): ?>
            <p class="erro"><?= $_SESSION['erro']; unset($_SESSION['erro']); ?></p>
            <?php endif; ?> 
            <form id="loginForm" onsubmit="login(event)" action="autenticar.php" method="POST">
                <div class="input-wrapper">
                    <span><strong>Email institucional:</strong></span>
                    <input type="email" name="email" placeholder="Digite seu email" required>
                </div>
                <div class="input-wrapper">
                    <span><strong>Senha:</strong></span>
                    <div class="password-input">
                        <input type="password" name="password" id="passwordInput" placeholder="Digite sua senha" required>
                        <span class="toggle-password" onclick="togglePasswordVisibility()">Mostrar Senha</span>
                    </div>
                </div>
                <a href="cadastro.html" class="link">Cadastrar</a>
                <a href="esqueceu_senha.html" class="link">Esqueceu sua senha?</a>
                <button type="submit" class="login-link">Login</button>
            </form>
        </div>
    </main>

    <div id="footer-placeholder"></div>
    <script src="js/rodape.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/login.js"></script>
</body>

</html>