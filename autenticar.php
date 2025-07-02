<?php
session_start();
require __DIR__ . '/api/config.php';

if (!isset($pdo)) {
    die("PDO não existe — config.php não foi carregado!");
}

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if (empty($email) || empty($senha)) {
    $_SESSION['erro'] = "Preencha todos os campos!";
    header('Location: login.php');
    exit;
}

$sql = "SELECT * FROM usuarios WHERE email = :email LIMIT 1"; //importante! evitar sql injection apenas colocando como variavel
$stmt = $pdo->prepare($sql);
$stmt->execute(['email' => $email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    $_SESSION['user_id'] = $usuario['id'];
    $_SESSION['nome'] = $usuario['nome'];
    if (isset($_POST['lembrar'])) {
        setcookie('email', $email, time() + 3600 * 24 * 30, "/"); // 30 dias de cookie
    }
    header('Location: painel.php');
    exit;
} else {
    $_SESSION['erro'] = "E-mail ou senha inválidos.";
    header('Location: login.php');
    exit;
}
exit;
