<?php
require 'check.php';
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$email = $input['email'] ?? '';
$senha = $input['senha'] ?? ''; 
$tipo_usuario = $input['tipo_usuario'] ?? 'funcionario'; 

if (empty($nome) || empty($email) || empty($senha)) {
    echo json_encode(['error' => 'Nome, e-mail e senha são obrigatórios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Formato de e-mail inválido.']);
    exit;
}

$senha_hashed = password_hash($senha, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['error' => 'E-mail já cadastrado.']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nome, $email, $senha_hashed, $tipo_usuario]);

    echo json_encode(['success' => true, 'message' => 'Funcionário adicionado com sucesso!']);
} catch (PDOException $e) {
    error_log("Erro ao adicionar funcionário: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao adicionar funcionário.']);
}
?>