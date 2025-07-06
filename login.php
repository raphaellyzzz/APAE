<?php session_start(); ?>
<?php if (!empty($_SESSION['erro_admin'])): ?>
  <p class="erro"><?= $_SESSION['erro_admin']; unset($_SESSION['erro_admin']); ?></p>
<?php endif; ?>
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
            <form id="adminLoginForm" action="api/processa_admin_login.php" method="POST">
                <div class="input-wrapper">
                    <span><strong>Email cadastrado:</strong></span>
                    <input type="email" id="email" name="email" required placeholder="Digite o email">
                </div>
                <div class="input-wrapper">
                    <span><strong>Senha:</strong></span>
                    <div class="password-input">
                        <input type="password" id="senha" name="senha" required placeholder="Digite a senha">
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
</body>

</html>