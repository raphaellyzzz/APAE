<?php
    require 'check.php';
    require 'config.php';

    $id = $_GET['id'] ?? null;

    if (empty($id)) {
        echo json_encode(['error' => 'ID do funcionário é obrigatório.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, nome, email, tipo_usuario FROM usuarios WHERE id = ?");
        $stmt->execute([$id]);
        $funcionario = $stmt->fetch();
        if ($funcionario) {
            echo json_encode($funcionario);
        } else {
            echo json_encode(['error' => 'Funcionário não encontrado.']);
        }
    } catch (PDOException $e) {
        error_log("Erro ao buscar funcionário por ID: " . $e->getMessage());
        echo json_encode(['error' => 'Erro ao buscar funcionário.']);
    }
    ?>