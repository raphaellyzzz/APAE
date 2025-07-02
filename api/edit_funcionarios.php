<?php
require 'check.php';
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? null;
$nome = $input['nome'] ?? '';
$email = $input['email'] ?? '';
$senha = $input['senha'] ?? ''; 
$tipo_usuario = $input['tipo_usuario'] ?? null;

if (empty($id)) {
    echo json_encode(['error' => 'ID do funcionário é obrigatório.']);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Formato de e-mail inválido.']);
    exit;
}

$sql = "UPDATE usuarios SET nome = ?, email = ?";
$params = [$nome, $email];

if (!empty($senha)) {
    $senha_hashed = password_hash($senha, PASSWORD_DEFAULT);
    $sql .= ", senha = ?";
    $params[] = $senha_hashed;
}
if (!empty($tipo_usuario)) {
    $sql .= ", tipo_usuario = ?";
    $params[] = $tipo_usuario;
}

$sql .= " WHERE id = ?";
$params[] = $id;

try {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE email = ? AND id != ?");
    $stmt->execute([$email, $id]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['error' => 'E-mail já cadastrado para outro funcionário.']);
        exit;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Funcionário atualizado com sucesso!']);
} catch (PDOException $e) {
    error_log("Erro ao editar funcionário: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao editar funcionário.']);
}
?>