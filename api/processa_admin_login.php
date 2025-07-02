<?php

// os comentarios sao para erro de debug, vai em: 'xampp/apache/logs/error' para verificar caso seja necessário

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

session_start();

//error_log("DEBUG: Antes de incluir config.php. Pdo existe? " . var_export(isset($pdo), true));
require __DIR__ . '/config.php';
//error_log("DEBUG: Apos incluir config.php. Pdo existe? " . var_export(isset($pdo), true));

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

//error_log("DEBUG: processa_admin_login.php - Email recebido: '" . $email . "'");
//error_log("DEBUG: processa_admin_login.php - Senha recebida (plain text): '" . $senha . "'");

if (!$email || !$senha) {
    $_SESSION['erro_admin'] = 'Preencha todos os campos.';
    header('Location: ../admin.php');
    exit;
}

try {
    //error_log("DEBUG: antes da query. pdo eh um objeto PDO? " . var_export($pdo instanceof PDO, true));
    
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC); 

    //error_log("DEBUG: dps de fetch. valor de usuario: " . print_r($usuario, true));

} catch (PDOException $e) {
    error_log("Erro ao buscar usuário: " . $e->getMessage());
    $_SESSION['erro_admin'] = 'Erro no servidor. Tente mais tarde.';
    header('Location: ../admin.php');
    exit;
}

if ($usuario && password_verify($senha, $usuario['senha']) && ($usuario['tipo_usuario'] ?? '') === 'admin') {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_id']        = $usuario['id'];
    $_SESSION['admin_nome']      = $usuario['nome'];

    //error_log("DEBUG: login ok. variavel de sessao 'admin_logged_in' setada para: " . var_export($_SESSION['admin_logged_in'], true));
    //error_log("DEBUG: tentando redirecionar para: ../listagem.php");

    header('Location: ../listagem.php');
    exit;
} else {
    //error_log("--- DEBUG: DETALHE DA FALHA NO LOGIN: ---");
    //error_log("  - usuario encontrado (antes do if): " . var_export((bool)$usuario, true));
    //error_log("  - senha digitada: '" . $senha . "'");
    //error_log("  - hash do DB: '" . ($usuario['senha'] ?? 'N/A') . "'");
    //error_log("  - resultado password_verify: " . var_export(password_verify($senha, $usuario['senha'] ?? ''), true));
    //error_log("  - tipo de usuario do DB: '" . ($usuario['tipo_usuario'] ?? 'N/A') . "'");
    //error_log("  - resultado comparacao tipo_usuario: " . var_export((($usuario['tipo_usuario'] ?? '') === 'admin'), true));

    $_SESSION['erro_admin'] = 'E-mail ou senha inválidos, ou sem permissão.';
    //error_log("DEBUG: login falhou. Mensagem de erro setada: " . $_SESSION['erro_admin']);
    header('Location: ../admin.php');
    exit;
}
?>