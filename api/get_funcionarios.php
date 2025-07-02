<?php
require 'check.php'; 
require 'config.php';

try {
    $stmt = $pdo->prepare("SELECT id, nome, email FROM usuarios WHERE tipo_usuario = 'funcionario' OR tipo_usuario = 'admin'");
    $stmt->execute();
    $funcionarios = $stmt->fetchAll();
    echo json_encode($funcionarios);
    
} catch (PDOException $e) {
    error_log("Erro ao buscar funcionários: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao carregar funcionários.']);
}
?>