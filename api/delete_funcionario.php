<?php
require 'check.php';
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (empty($id)) {
    echo json_encode(['error' => 'ID do funcionário é obrigatório.']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Funcionário excluído com sucesso!']);
    } else {
        echo json_encode(['error' => 'Funcionário não encontrado.']);
    }
} catch (PDOException $e) {
    error_log("Erro ao excluir funcionário: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao excluir funcionário.']);
}
?>