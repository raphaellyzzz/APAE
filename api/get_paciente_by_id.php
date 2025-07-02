<?php
require 'check.php';
require 'config.php';

$id = $_GET['id'] ?? null;

if (empty($id)) {
    echo json_encode(['error' => 'ID do paciente é obrigatório.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM pacientes WHERE id = ?");
    $stmt->execute([$id]);
    $paciente = $stmt->fetch();
    if ($paciente) {
        echo json_encode($paciente);
    } else {
        echo json_encode(['error' => 'Paciente não encontrado.']);
    }
} catch (PDOException $e) {
    error_log("Erro ao buscar paciente por ID: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao buscar paciente.']);
}

?>