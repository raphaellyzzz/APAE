<?php
require 'check.php';
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$nome_completo = $input['nome_completo'] ?? '';
$cid = $input['cid'] ?? null;
$data_nascimento = $input['data_nascimento'] ?? null;
$nome_responsavel = $input['nome_responsavel'] ?? null;
$vinculo_familiar = $input['vinculo_familiar'] ?? null;
$telefone = $input['telefone'] ?? null;
$composicao_familiar = $input['composicao_familiar'] ?? null;
$valor_componente_familiar = $input['valor_componente_familiar'] ?? null;
$bpc = $input['bpc'] ?? null;
$bolsa_familia = $input['bolsa_familia'] ?? null;
$pessoas_trabalham = $input['pessoas_trabalham'] ?? null;
$renda_familiar = $input['renda_familiar'] ?? null;
$residencia = $input['residencia'] ?? null;
$matriculado = $input['matriculado'] ?? null; 
$mediador = $input['mediador'] ?? null;
$serie = $input['serie'] ?? null;
$escola = $input['escola'] ?? null;
$nome_escola = $input['nome_escola'] ?? null;
$turno = $input['turno'] ?? null;
$fisioterapia = $input['fisioterapia'] ?? 0;
$pintura = $input['pintura'] ?? 0;
$musica = $input['musica'] ?? 0;
$hidroterapia = $input['hidroterapia'] ?? 0;
$informatica = $input['informatica'] ?? 0;
$terapia_ocupacional = $input['terapia_ocupacional'] ?? 0;
$fonoaudiologia = $input['fonoaudiologia'] ?? 0;
$psicologia = $input['psicologia'] ?? 0;

if (empty($nome_completo)) {
    echo json_encode(['error' => 'Nome do paciente é obrigatório.']);
    exit;
}

if (!empty($data_nascimento)) {
    $d = DateTime::createFromFormat('Y-m-d', $data_nascimento); 
    if (!$d || $d->format('Y-m-d') !== $data_nascimento) { 
        echo json_encode(['error' => 'Formato de data de nascimento inválido. Use AAAA-MM-DD.']); 
        exit;
    }
}

try {
    $stmt = $pdo->prepare("INSERT INTO pacientes (
        nome_completo, cid, data_nascimento, nome_responsavel, vinculo_familiar, telefone,
        composicao_familiar, valor_componente_familiar, bpc, bolsa_familia, pessoas_trabalham,
        renda_familiar, residencia, matriculado, mediador, serie, escola, nome_escola, turno,
        fisioterapia, pintura, musica, hidroterapia, informatica, terapia_ocupacional,
        fonoaudiologia, psicologia
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )");

    $stmt->execute([
        $nome_completo, $cid, $data_nascimento, $nome_responsavel, $vinculo_familiar, $telefone,
        $composicao_familiar, $valor_componente_familiar, $bpc, $bolsa_familia, $pessoas_trabalham,
        $renda_familiar, $residencia, $matriculado, $mediador, $serie, $escola, $nome_escola, $turno,
        $fisioterapia, $pintura, $musica, $hidroterapia, $informatica, $terapia_ocupacional,
        $fonoaudiologia, $psicologia
    ]);

    echo json_encode(['success' => true, 'message' => 'Paciente adicionado com sucesso!']);
} catch (PDOException $e) {
    error_log("Erro ao adicionar paciente: " . $e->getMessage());
    echo json_encode(['error' => 'Erro ao adicionar paciente.']);
}
?>