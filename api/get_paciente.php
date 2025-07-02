<?php
require 'check.php';
require 'config.php';

try {
    $stmt = $pdo->prepare("SELECT * FROM pacientes");
    $stmt->execute();
    $pacientes = $stmt->fetchAll();
    echo json_encode($pacientes);
} catch (PDOException $e) {
    error_log("Erro ao buscar pacientes: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao carregar pacientes.']);
}
?>