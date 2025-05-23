document.addEventListener('DOMContentLoaded', () => {
    loadPacientes();
    loadFuncionarios();

    // Função para carregar e exibir a lista de funcionários
    function loadFuncionarios() {
        var funcionarios = JSON.parse(localStorage.getItem("users")) || [];
        var userList = document.getElementById("userList");

        userList.innerHTML = "";

        funcionarios.forEach((funcionario, index) => {
            var row = document.createElement("tr");

            var nomeCell = document.createElement("td");
            nomeCell.textContent = funcionario.firstname;
            row.appendChild(nomeCell);

            var sobrenomeCell = document.createElement("td");
            sobrenomeCell.textContent = funcionario.lastname;
            row.appendChild(sobrenomeCell);

            var emailCell = document.createElement("td");
            emailCell.textContent = funcionario.email;
            row.appendChild(emailCell);

            var actionsCell = document.createElement("td");

            var editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.className = "edit-button";
            editButton.onclick = function () {
                // Implementar lógica de edição se necessário
                editFuncionario(index);
            };
            actionsCell.appendChild(editButton);

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.className = "delete-button";
            deleteButton.onclick = function () {
                deleteFuncionario(index);
            };
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            userList.appendChild(row);
        });
    }

    // Função para excluir um funcionário
    function deleteFuncionario(index) {
        let funcionarios = JSON.parse(localStorage.getItem("users")) || [];
        funcionarios.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(funcionarios));
        loadFuncionarios();
    }

    // Função para editar um funcionário
    // Função para editar um funcionário
    // Função para editar um funcionário
function editFuncionario(index) {
    let funcionarios = JSON.parse(localStorage.getItem("users")) || [];
    let funcionario = funcionarios[index];

    // Solicitar novas informações através de prompts
    let newFirstname = prompt("Digite o novo nome:", funcionario.firstname);
    let newLastname = prompt("Digite o novo sobrenome:", funcionario.lastname);
    let newEmail = prompt("Digite o novo email:", funcionario.email);

    // Verificar se o usuário forneceu novos valores e atualizar
    if (newFirstname !== null && newFirstname.trim() !== "") {
        funcionario.firstname = newFirstname.trim();
    }
    if (newLastname !== null && newLastname.trim() !== "") {
        funcionario.lastname = newLastname.trim();
    }
    if (newEmail !== null && newEmail.trim() !== "") {
        funcionario.email = newEmail.trim();
    }

    // Atualizar o localStorage e recarregar a lista de funcionários
    funcionarios[index] = funcionario;
    localStorage.setItem("users", JSON.stringify(funcionarios));
    loadFuncionarios();
}



    // Função para carregar e exibir a lista de pacientes
    function loadPacientes() {
        var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        var patientList = document.getElementById("patientList");

        patientList.innerHTML = "";

        pacientes.forEach((paciente, index) => {
            var row = document.createElement("tr");

            var nomeCell = document.createElement("td");
            nomeCell.textContent = paciente.nome_usuario;
            row.appendChild(nomeCell);

            var cidCell = document.createElement("td");
            cidCell.textContent = paciente.cid;
            row.appendChild(cidCell);

            var dataNascimentoCell = document.createElement("td");
            dataNascimentoCell.textContent = paciente.data_nascimento;
            row.appendChild(dataNascimentoCell);

            var nomeResponsavelCell = document.createElement("td");
            nomeResponsavelCell.textContent = paciente.nome_responsavel;
            row.appendChild(nomeResponsavelCell);

            var vinculoFamiliarCell = document.createElement("td");
            vinculoFamiliarCell.textContent = paciente.vinculo_familiar;
            row.appendChild(vinculoFamiliarCell);

            var telefoneCell = document.createElement("td");
            telefoneCell.textContent = paciente.telefone;
            row.appendChild(telefoneCell);

            var actionsCell = document.createElement("td");

            var editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.className = "edit-button";
            editButton.onclick = function () {
                // Implementar lógica de edição se necessário
                editPaciente(index);
            };
            actionsCell.appendChild(editButton);

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.className = "delete-button";
            deleteButton.onclick = function () {
                deletePaciente(index);
            };
            actionsCell.appendChild(deleteButton);

            var moreInfoButton = document.createElement("button");
            moreInfoButton.textContent = "Mais Informações";
            moreInfoButton.className = "more-info-button";
            moreInfoButton.onclick = function () {
                showDetails(paciente);
            };
            actionsCell.appendChild(moreInfoButton);

            row.appendChild(actionsCell);
            patientList.appendChild(row);
        });
    }

    // Função para excluir um paciente
    function deletePaciente(index) {
        let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        pacientes.splice(index, 1);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        loadPacientes();
    }

    // Função para editar um paciente
    // Função para editar um paciente
function editPaciente(index) {
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    let paciente = pacientes[index];

    // Solicitar novas informações através de prompts
    let newNome = prompt("Digite o novo nome:", paciente.nome_usuario);
    let newCid = prompt("Digite o novo CID:", paciente.cid);
    let newDataNascimento = prompt("Digite a nova data de nascimento (YYYY-MM-DD):", paciente.data_nascimento);
    let newNomeResponsavel = prompt("Digite o novo nome do responsável:", paciente.nome_responsavel);
    let newVinculoFamiliar = prompt("Digite o novo vínculo familiar:", paciente.vinculo_familiar);
    let newTelefone = prompt("Digite o novo telefone:", paciente.telefone);
    let newComposicaoFamiliar = prompt("Digite a nova composição familiar:", paciente.composicao_familiar);
    let newValorComponenteFamiliar = prompt("Digite o novo valor do componente familiar:", paciente.valor_componente_familiar);
    let newBpc = prompt("Digite o novo valor do BPC:", paciente.bpc);
    let newBolsaFamilia = prompt("Digite o novo valor do Bolsa Família:", paciente.bolsa_familia);
    let newPessoasTrabalham = prompt("Digite o novo número de pessoas que trabalham:", paciente.pessoas_trabalham);
    let newRendaFamiliar = prompt("Digite a nova renda familiar:", paciente.renda_familiar);
    let newResidencia = prompt("Digite o novo tipo de residência:", paciente.residencia);
    let newMatriculado = prompt("Digite o status de matriculado (Sim/Não):", paciente.matriculado);
    let newMediador = prompt("Digite o nome do mediador:", paciente.mediador);
    let newSerie = prompt("Digite a nova série:", paciente.serie);
    let newEscola = prompt("Digite o nome da escola:", paciente.escola);
    let newNomeEscola = prompt("Digite o nome da escola:", paciente.nome_escola);
    let newTurno = prompt("Digite o novo turno:", paciente.turno);
    let newFisioterapia = prompt("Digite o status de fisioterapia (Sim/Não):", paciente.fisioterapia);
    let newPintura = prompt("Digite o status de pintura (Sim/Não):", paciente.pintura);
    let newMusica = prompt("Digite o status de música (Sim/Não):", paciente.musica);
    let newHidroterapia = prompt("Digite o status de hidroterapia (Sim/Não):", paciente.hidroterapia);
    let newInformatica = prompt("Digite o status de informática (Sim/Não):", paciente.informatica);
    let newTerapiaOcupacional = prompt("Digite o status de terapia ocupacional (Sim/Não):", paciente.terapia_ocupacional);
    let newFonoaudiologia = prompt("Digite o status de fonoaudiologia (Sim/Não):", paciente.fonoaudiologia);
    let newPsicologia = prompt("Digite o status de psicologia (Sim/Não):", paciente.psicologia);

    // Atualizar o objeto paciente se novos valores forem fornecidos
    paciente.nome_usuario = newNome !== null && newNome.trim() !== "" ? newNome.trim() : paciente.nome_usuario;
    paciente.cid = newCid !== null && newCid.trim() !== "" ? newCid.trim() : paciente.cid;
    paciente.data_nascimento = newDataNascimento !== null && newDataNascimento.trim() !== "" ? newDataNascimento.trim() : paciente.data_nascimento;
    paciente.nome_responsavel = newNomeResponsavel !== null && newNomeResponsavel.trim() !== "" ? newNomeResponsavel.trim() : paciente.nome_responsavel;
    paciente.vinculo_familiar = newVinculoFamiliar !== null && newVinculoFamiliar.trim() !== "" ? newVinculoFamiliar.trim() : paciente.vinculo_familiar;
    paciente.telefone = newTelefone !== null && newTelefone.trim() !== "" ? newTelefone.trim() : paciente.telefone;
    paciente.composicao_familiar = newComposicaoFamiliar !== null && newComposicaoFamiliar.trim() !== "" ? newComposicaoFamiliar.trim() : paciente.composicao_familiar;
    paciente.valor_componente_familiar = newValorComponenteFamiliar !== null && newValorComponenteFamiliar.trim() !== "" ? newValorComponenteFamiliar.trim() : paciente.valor_componente_familiar;
    paciente.bpc = newBpc !== null && newBpc.trim() !== "" ? newBpc.trim() : paciente.bpc;
    paciente.bolsa_familia = newBolsaFamilia !== null && newBolsaFamilia.trim() !== "" ? newBolsaFamilia.trim() : paciente.bolsa_familia;
    paciente.pessoas_trabalham = newPessoasTrabalham !== null && newPessoasTrabalham.trim() !== "" ? newPessoasTrabalham.trim() : paciente.pessoas_trabalham;
    paciente.renda_familiar = newRendaFamiliar !== null && newRendaFamiliar.trim() !== "" ? newRendaFamiliar.trim() : paciente.renda_familiar;
    paciente.residencia = newResidencia !== null && newResidencia.trim() !== "" ? newResidencia.trim() : paciente.residencia;
    paciente.matriculado = newMatriculado !== null && newMatriculado.trim() !== "" ? newMatriculado.trim() : paciente.matriculado;
    paciente.mediador = newMediador !== null && newMediador.trim() !== "" ? newMediador.trim() : paciente.mediador;
    paciente.serie = newSerie !== null && newSerie.trim() !== "" ? newSerie.trim() : paciente.serie;
    paciente.escola = newEscola !== null && newEscola.trim() !== "" ? newEscola.trim() : paciente.escola;
    paciente.nome_escola = newNomeEscola !== null && newNomeEscola.trim() !== "" ? newNomeEscola.trim() : paciente.nome_escola;
    paciente.turno = newTurno !== null && newTurno.trim() !== "" ? newTurno.trim() : paciente.turno;
    paciente.fisioterapia = newFisioterapia !== null && newFisioterapia.trim() !== "" ? newFisioterapia.trim() : paciente.fisioterapia;
    paciente.pintura = newPintura !== null && newPintura.trim() !== "" ? newPintura.trim() : paciente.pintura;
    paciente.musica = newMusica !== null && newMusica.trim() !== "" ? newMusica.trim() : paciente.musica;
    paciente.hidroterapia = newHidroterapia !== null && newHidroterapia.trim() !== "" ? newHidroterapia.trim() : paciente.hidroterapia;
    paciente.informatica = newInformatica !== null && newInformatica.trim() !== "" ? newInformatica.trim() : paciente.informatica;
    paciente.terapia_ocupacional = newTerapiaOcupacional !== null && newTerapiaOcupacional.trim() !== "" ? newTerapiaOcupacional.trim() : paciente.terapia_ocupacional;
    paciente.fonoaudiologia = newFonoaudiologia !== null && newFonoaudiologia.trim() !== "" ? newFonoaudiologia.trim() : paciente.fonoaudiologia;
    paciente.psicologia = newPsicologia !== null && newPsicologia.trim() !== "" ? newPsicologia.trim() : paciente.psicologia;

    // Atualizar o localStorage e recarregar a lista de pacientes
    pacientes[index] = paciente;
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    loadPacientes();
}


    // Função para mostrar detalhes do paciente
    function showDetails(paciente) {
        const detailCard = document.getElementById("detail-card");
        const detailContent = document.getElementById("detail-content");

        detailContent.innerHTML = `
            <h3>Detalhes do Paciente</h3>
            <p><strong>Nome:</strong> ${paciente.nome_usuario}</p>
            <p><strong>CID:</strong> ${paciente.cid}</p>
            <p><strong>Data de Nascimento:</strong> ${paciente.data_nascimento}</p>
            <p><strong>Nome do Responsável:</strong> ${paciente.nome_responsavel}</p>
            <p><strong>Vínculo Familiar:</strong> ${paciente.vinculo_familiar}</p>
            <p><strong>Telefone:</strong> ${paciente.telefone}</p>
            <p><strong>Composição Familiar:</strong> ${paciente.composicao_familiar}</p>
            <p><strong>Valor do Componente Familiar:</strong> ${paciente.valor_componente_familiar}</p>
            <p><strong>BPC:</strong> ${paciente.bpc}</p>
            <p><strong>Bolsa Família:</strong> ${paciente.bolsa_familia}</p>
            <p><strong>Pessoas que Trabalham:</strong> ${paciente.pessoas_trabalham}</p>
            <p><strong>Renda Familiar:</strong> ${paciente.renda_familiar}</p>
            <p><strong>Residência:</strong> ${paciente.residencia}</p>
            <p><strong>Matriculado:</strong> ${paciente.matriculado}</p>
            <p><strong>Mediador:</strong> ${paciente.mediador}</p>
            <p><strong>Série:</strong> ${paciente.serie}</p>
            <p><strong>Escola:</strong> ${paciente.escola}</p>
            <p><strong>Nome da Escola:</strong> ${paciente.nome_escola}</p>
            <p><strong>Turno:</strong> ${paciente.turno}</p>
            <p><strong>Fisioterapia:</strong> ${paciente.fisioterapia}</p>
            <p><strong>Pintura:</strong> ${paciente.pintura}</p>
            <p><strong>Música:</strong> ${paciente.musica}</p>
            <p><strong>Hidroterapia:</strong> ${paciente.hidroterapia}</p>
            <p><strong>Informática:</strong> ${paciente.informatica}</p>
            <p><strong>Terapia Ocupacional:</strong> ${paciente.terapia_ocupacional}</p>
            <p><strong>Fonoaudiologia:</strong> ${paciente.fonoaudiologia}</p>
            <p><strong>Psicologia:</strong> ${paciente.psicologia}</p>
        `;

        detailCard.style.display = 'block';
    }

    // Função para fechar o card de detalhes
    window.closeDetails = function () {
        const detailCard = document.getElementById("detail-card");
        detailCard.style.display = 'none';
    }
});
