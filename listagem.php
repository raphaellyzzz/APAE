<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

error_log("DEBUG: listagem.php - Pagina acessada. Valor de 'admin_logged_in' na sessao: " . var_export($_SESSION['admin_logged_in'] ?? false, true));

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    error_log("DEBUG: listagem.php - Redirecionando para login.php (sessao nao valida).");
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Funcionários e Pacientes</title>
    <link rel="stylesheet" href="css/rodape.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/listagem.css?v=1.8">
    <link rel="shortcut icon" href="img/autismo_logo.png" type="image/x-icon">
</head>

<body>
    <header id="navbar-placeholder"></header>

    <main class="container">
        <section class="card">
            <h2>Funcionários Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="userList"></tbody>
            </table>
            <div class="actions">
                 <button id="openAddFuncionarioModal" class="add-button">Adicionar Novo Funcionário</button>
            </div>
        </section>

        <section class="card">
            <h2>Pacientes Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CID</th>
                        <th>Data de Nascimento</th>
                        <th>Nome do Responsável</th>
                        <th>Vínculo Familiar</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="patientList">
                </tbody>
            </table>
            <div class="actions">
                <button id="openAddPacienteModal" class="add-button">Adicionar Novo Paciente</button>
            </div>
        </section>
    </main>

     <div id="addFuncionarioModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeAddFuncionarioModal()">&times;</span>
            <h2>Adicionar Novo Funcionário</h2>
            <form id="addFuncionarioForm">
                <div class="input-group">
                    <label for="add_nome">Nome:</label>
                    <input type="text" id="add_nome" name="nome" required>
                </div>
                <div class="input-group">
                    <label for="add_email">Email:</label>
                    <input type="email" id="add_email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="add_senha">Senha:</label>
                    <input type="password" id="add_senha" name="senha" required>
                </div>
                <div class="input-group">
                    <label for="add_confirm_senha">Confirmar Senha:</label>
                    <input type="password" id="add_confirm_senha" name="confirm_senha" required>
                    <p id="passwordMatchError" class="error-message"></p>
                </div>
                <div class="input-group">
                    <label for="add_tipo_usuario">Tipo de Usuário:</label>
                    <select id="add_tipo_usuario" name="tipo_usuario" required>
                        <option value="funcionario">Funcionário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit">Cadastrar Funcionário</button>
            </form>
        </div>
    </div>

    <div id="editFuncionarioModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeEditFuncionarioModal()">&times;</span>
            <h2>Editar Funcionário</h2>
            <form id="editFuncionarioForm">
                <input type="hidden" id="edit_funcionario_id" name="id">
                <div class="input-group">
                    <label for="edit_nome">Nome:</label>
                    <input type="text" id="edit_nome" name="nome" required>
                </div>
                <div class="input-group">
                    <label for="edit_email">Email:</label>
                    <input type="email" id="edit_email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="edit_senha">Nova Senha (opcional):</label>
                    <input type="password" id="edit_senha" name="senha">
                </div>
                <div class="input-group">
                    <label for="edit_confirm_senha">Confirmar Nova Senha:</label>
                    <input type="password" id="edit_confirm_senha" name="confirm_senha">
                    <p id="editPasswordMatchError" class="error-message"></p>
                </div>
                <div class="input-group">
                    <label for="edit_tipo_usuario">Tipo de Usuário:</label>
                    <select id="edit_tipo_usuario" name="tipo_usuario" required>
                        <option value="funcionario">Funcionário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div class="modal-buttons">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onclick="closeEditFuncionarioModal()">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <div id="addPacienteModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeAddPacienteModal()">&times;</span>
            <h2>Adicionar Novo Paciente</h2>
            <form id="addPacienteForm">
                <div class="form-field-card">
                    <label for="add_nome_completo">Nome Completo:</label>
                    <input type="text" id="add_nome_completo" name="nome_completo" required>
                </div>

                <div class="form-field-card">
                    <label for="add_cid">CID:</label>
                    <input type="text" id="add_cid" name="cid">
                </div>

                <div class="form-field-card">
                    <label for="add_data_nascimento">Data de Nascimento:</label>
                    <input type="date" id="add_data_nascimento" name="data_nascimento">
                </div>

                <div class="form-field-card">
                    <label for="add_nome_responsavel">Nome do Responsável:</label>
                    <input type="text" id="add_nome_responsavel" name="nome_responsavel">
                </div>

                <div class="form-field-card">
                    <label for="add_vinculo_familiar">Vínculo Familiar:</label>
                    <input type="text" id="add_vinculo_familiar" name="vinculo_familiar">
                </div>

                <div class="form-field-card">
                    <label for="add_telefone">Telefone:</label>
                    <input type="text" id="add_telefone" name="telefone">
                </div>

                <div class="form-field-card">
                    <label for="add_composicao_familiar">Composição Familiar:</label>
                    <textarea id="add_composicao_familiar" name="composicao_familiar"></textarea>
                </div>

                <div class="form-field-card">
                    <label for="add_valor_componente_familiar">Valor Componente Familiar:</label>
                    <input type="number" step="0.01" id="add_valor_componente_familiar" name="valor_componente_familiar">
                </div>

                <div class="form-field-card">
                    <label for="add_bpc">BPC:</label>
                    <input type="text" id="add_bpc" name="bpc">
                </div>

                <div class="form-field-card">
                    <label for="add_bolsa_familia">Bolsa Família:</label>
                    <input type="text" id="add_bolsa_familia" name="bolsa_familia">
                </div>

                <div class="form-field-card">
                    <label for="add_pessoas_trabalham">Pessoas que Trabalham:</label>
                    <input type="number" id="add_pessoas_trabalham" name="pessoas_trabalham">
                </div>

                <div class="form-field-card">
                    <label for="add_renda_familiar">Renda Familiar:</label>
                    <input type="number" step="0.01" id="add_renda_familiar" name="renda_familiar">
                </div>

                <div class="form-field-card">
                    <label for="add_residencia">Residência:</label>
                    <input type="text" id="add_residencia" name="residencia">
                </div>

                <div class="form-field-card">
                    <label for="add_matriculado">Matriculado:</label>
                    <select id="add_matriculado" name="matriculado">
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </select>
                </div>

                <div class="form-field-card">
                    <label for="add_mediador">Mediador:</label>
                    <input type="text" id="add_mediador" name="mediador">
                </div>

                <div class="form-field-card">
                    <label for="add_serie">Série:</label>
                    <input type="text" id="add_serie" name="serie">
                </div>

                <div class="form-field-card">
                    <label for="add_escola">Escola:</label>
                    <input type="text" id="add_escola" name="escola">
                </div>

                <div class="form-field-card">
                    <label for="add_nome_escola">Nome da Escola:</label>
                    <input type="text" id="add_nome_escola" name="nome_escola">
                </div>

                <div class="form-field-card">
                    <label for="add_turno">Turno:</label>
                    <input type="text" id="add_turno" name="turno">
                </div>

               <div class="form-field-card checkbox-group">
                    <label class="group-title">Terapias:</label>
                    <div><input type="checkbox" id="add_fisioterapia" name="fisioterapia" value="1"> <label for="add_fisioterapia">Fisioterapia</label></div>
                    <div><input type="checkbox" id="add_pintura" name="pintura" value="1"> <label for="add_pintura">Pintura</label></div>
                    <div><input type="checkbox" id="add_musica" name="musica" value="1"> <label for="add_musica">Música</label></div>
                    <div><input type="checkbox" id="add_hidroterapia" name="hidroterapia" value="1"> <label for="add_hidroterapia">Hidroterapia</label></div>
                    <div><input type="checkbox" id="add_informatica" name="informatica" value="1"> <label for="add_informatica">Informática</label></div>
                    <div><input type="checkbox" id="add_terapia_ocupacional" name="terapia_ocupacional" value="1"> <label for="add_terapia_ocupacional">Terapia Ocupacional</label></div>
                    <div><input type="checkbox" id="add_fonoaudiologia" name="fonoaudiologia" value="1"> <label for="add_fonoaudiologia">Fonoaudiologia</label></div>
                    <div><input type="checkbox" id="add_psicologia" name="psicologia" value="1"> <label for="add_psicologia">Psicologia</label></div>
                </div>

                <div class="modal-buttons">
                    <button type="submit">Salvar Paciente</button>
                    <button type="button" onclick="closeAddPacienteModal()">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <div id="editPacienteModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeEditPacienteModal()">&times;</span>
            <h2>Editar Paciente</h2>
            <form id="editPacienteForm">
                <input type="hidden" id="edit_id" name="id">

                <div class="form-field-card">
                    <label for="edit_nome_completo">Nome Completo:</label>
                    <input type="text" id="edit_nome_completo" name="nome_completo" required>
                </div>

                <div class="form-field-card">
                    <label for="edit_cid">CID:</label>
                    <input type="text" id="edit_cid" name="cid">
                </div>

                <div class="form-field-card">
                    <label for="edit_data_nascimento">Data de Nascimento:</label>
                    <input type="date" id="edit_data_nascimento" name="data_nascimento">
                </div>

                <div class="form-field-card">
                    <label for="edit_nome_responsavel">Nome do Responsável:</label>
                    <input type="text" id="edit_nome_responsavel" name="nome_responsavel">
                </div>

                <div class="form-field-card">
                    <label for="edit_vinculo_familiar">Vínculo Familiar:</label>
                    <input type="text" id="edit_vinculo_familiar" name="vinculo_familiar">
                </div>

                <div class="form-field-card">
                    <label for="edit_telefone">Telefone:</label>
                    <input type="text" id="edit_telefone" name="telefone">
                </div>

                <div class="form-field-card">
                    <label for="edit_composicao_familiar">Composição Familiar:</label>
                    <textarea id="edit_composicao_familiar" name="composicao_familiar"></textarea>
                </div>

                <div class="form-field-card">
                    <label for="edit_valor_componente_familiar">Valor Componente Familiar:</label>
                    <input type="number" step="0.01" id="edit_valor_componente_familiar" name="valor_componente_familiar">
                </div>

                <div class="form-field-card">
                    <label for="edit_bpc">BPC:</label>
                    <input type="text" id="edit_bpc" name="bpc">
                </div>

                <div class="form-field-card">
                    <label for="edit_bolsa_familia">Bolsa Família:</label>
                    <input type="text" id="edit_bolsa_familia" name="bolsa_familia">
                </div>

                <div class="form-field-card">
                    <label for="edit_pessoas_trabalham">Pessoas que Trabalham:</label>
                    <input type="number" id="edit_pessoas_trabalham" name="pessoas_trabalham">
                </div>

                <div class="form-field-card">
                    <label for="edit_renda_familiar">Renda Familiar:</label>
                    <input type="number" step="0.01" id="edit_renda_familiar" name="renda_familiar">
                </div>

                <div class="form-field-card">
                    <label for="edit_residencia">Residência:</label>
                    <input type="text" id="edit_residencia" name="residencia">
                </div>

                <div class="form-field-card">
                    <label for="edit_matriculado">Matriculado:</label>
                    <select id="edit_matriculado" name="matriculado">
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </select>
                </div>

                <div class="form-field-card">
                    <label for="edit_mediador">Mediador:</label>
                    <input type="text" id="edit_mediador" name="mediador">
                </div>

                <div class="form-field-card">
                    <label for="edit_serie">Série:</label>
                    <input type="text" id="edit_serie" name="serie">
                </div>

                <div class="form-field-card">
                    <label for="edit_escola">Escola:</label>
                    <input type="text" id="edit_escola" name="escola">
                </div>

                <div class="form-field-card">
                    <label for="edit_nome_escola">Nome da Escola:</label>
                    <input type="text" id="edit_nome_escola" name="nome_escola">
                </div>

                <div class="form-field-card">
                    <label for="edit_turno">Turno:</label>
                    <input type="text" id="edit_turno" name="turno">
                </div>

                <div class="form-field-card checkbox-group">
                    <label class="group-title">Terapias:</label>
                    <div><input type="checkbox" id="edit_fisioterapia" name="fisioterapia" value="1"> <label for="edit_fisioterapia">Fisioterapia</label></div>
                    <div><input type="checkbox" id="edit_pintura" name="pintura" value="1"> <label for="edit_pintura">Pintura</label></div>
                    <div><input type="checkbox" id="edit_musica" name="musica" value="1"> <label for="edit_musica">Música</label></div>
                    <div><input type="checkbox" id="edit_hidroterapia" name="hidroterapia" value="1"> <label for="edit_hidroterapia">Hidroterapia</label></div>
                    <div><input type="checkbox" id="edit_informatica" name="informatica" value="1"> <label for="edit_informatica">Informática</label></div>
                    <div><input type="checkbox" id="edit_terapia_ocupacional" name="terapia_ocupacional" value="1"> <label for="edit_terapia_ocupacional">Terapia Ocupacional</label></div>
                    <div><input type="checkbox" id="edit_fonoaudiologia" name="fonoaudiologia" value="1"> <label for="edit_fonoaudiologia">Fonoaudiologia</label></div>
                    <div><input type="checkbox" id="edit_psicologia" name="psicologia" value="1"> <label for="edit_psicologia">Psicologia</label></div>
                </div>

                <div class="modal-buttons">
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onclick="closeEditPacienteModal()">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <div id="detail-card" class="detail-card">
        <div id="detail-content"></div>
        <button onclick="closeDetails()">Fechar</button>
    </div>

    <div id="janela-edicao" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeJanelaEdicao()">&times;</span>
            <h2 id="janelaEdicaoTitle"></h2>
            <p id="janelaEdicaoBody"></p>
            <button class="modal-buttons" onclick="closeJanelaEdicao()">OK</button>
        </div>
    </div>

    <div id="footer-placeholder"></div>
    <script src="js/rodape.js" defer></script>
    <script src="js/navbar.js" defer></script>
    <script src="js/listagem.js" defer></script>
</body>

</html>