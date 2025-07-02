<?php
$host = 'localhost'; 
$db   = 'apae';
$user = 'root';      
$pass = '';      
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
} catch (\PDOException $e) {
    http_response_code(500); 
    echo json_encode(['error' => 'Erro interno do servidor: falha na conexão com o banco de dados.', 'details' => 'Por favor, tente novamente mais tarde.']);
    error_log("Erro crítico de conexão com o banco de dados: " . $e->getMessage()); 
    exit; 
}

// configuracao de pdo para caso a conexão falhar o script parar de maneira controlada exibindo mensagem de erro invés de uma mensagem genérica
// https://www.php.net/manual/pt_BR/book.pdo.php ----> documentacao caso necessário

?>