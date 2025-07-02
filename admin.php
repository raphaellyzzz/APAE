<?php session_start(); ?>
<?php if (!empty($_SESSION['erro_admin'])): ?>
  <p class="erro"><?= $_SESSION['erro_admin']; unset($_SESSION['erro_admin']); ?></p>
<?php endif; ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin</title>
    <link rel="stylesheet" href="css/rodape.css">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="shortcut icon" href="img/autismo_logo.png" type="image/x-icon">
</head>

<body>
    <header id="navbar-placeholder"></header>

    <div class="content-wrapper">
        <div class="login-container">
            <h2>Login de Admin</h2>
            <form id="adminLoginForm" action="api/processa_admin_login.php" method="POST">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required>

                <button type="submit">Entrar</button>
            </form>
        </div>
    </div>

    <footer id="footer-placeholder"></footer>

    <script src="js/rodape.js"></script>
    <script src="js/navbar.js"></script>
</body>

</html>