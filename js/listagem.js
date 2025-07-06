document.addEventListener('DOMContentLoaded', () => {
    loadPacientes();
    loadFuncionarios();

   function showJanelaEdicao(title, body) {
        document.getElementById('janelaEdicaoTitle').textContent = title;
        document.getElementById('janelaEdicaoBody').textContent = body;
        document.getElementById('janela-edicao').style.display = 'flex';
    }

    function closeJanelaEdicao() {
        document.getElementById('janela-edicao').style.display = 'none';
    }

    window.addEventListener('click', (event) => {
        const editModal = document.getElementById('editPacienteModal');
        if (event.target === editModal) {
            closeEditPacienteModal();
        }
    });

    window.closeJanelaEdicao = closeJanelaEdicao;

    function showEditPacienteModal() {
        document.getElementById('editPacienteModal').style.display = 'flex';
    }

    function closeEditPacienteModal() {
        document.getElementById('editPacienteModal').style.display = 'none';
    }

    window.showEditPacienteModal = showEditPacienteModal;
    window.closeEditPacienteModal = closeEditPacienteModal;

    function loadFuncionarios() {
        fetch('api/get_funcionarios.php')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao carregar funcionários.'); });
                }
                return response.json();
            })
            .then(data => {
                var userList = document.getElementById("userList");
                userList.innerHTML = "";

                if (data.error) {
                    userList.innerHTML = `<tr><td colspan="3">${data.error}</td></tr>`;

                    if (data.error.includes('Acesso não autorizado')) {
                        alert(data.error);
                        window.location.href = 'admin.html';
                    }
                    return;
                }
                if (data.length === 0) {
                    userList.innerHTML = '<tr><td colspan="3">Nenhum funcionário cadastrado.</td></tr>';
                    return;
                }

                data.forEach((funcionario) => {
                    var row = document.createElement("tr");

                    var nomeCell = document.createElement("td");
                    nomeCell.textContent = funcionario.nome;
                    row.appendChild(nomeCell);

                    var emailCell = document.createElement("td");
                    emailCell.textContent = funcionario.email;
                    row.appendChild(emailCell);

                    var actionsCell = document.createElement("td");

                    var editButton = document.createElement("button");
                    editButton.textContent = "Editar";
                    editButton.className = "edit-button";
                    editButton.onclick = function () {
                        editFuncionario(funcionario.id);
                    };
                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.textContent = "Excluir";
                    deleteButton.className = "delete-button";
                    deleteButton.onclick = function () {
                        if (confirm(`Tem certeza que deseja excluir ${funcionario.nome}?`)) {
                            deleteFuncionario(funcionario.id);
                        }
                    };
                    actionsCell.appendChild(deleteButton);

                    row.appendChild(actionsCell);
                    userList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar funcionários:', error);
                alert('Ocorreu um erro ao carregar os dados dos funcionários.');
            });
    }

    function deleteFuncionario(id) {
        fetch('api/delete_funcionario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao excluir funcionário.'); });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    loadFuncionarios();
                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir funcionário:', error);
                alert('Ocorreu um erro ao excluir o funcionário: ' + error.message);
            });
    }

    function editFuncionario(id) {
        fetch(`api/get_funcionario_by_id.php?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao buscar funcionário para edição.'); });
                }
                return response.json();
            })
            .then(funcionario => {
                if (funcionario.error) {
                    alert(funcionario.error);
                    return;
                }

                let newNome = prompt("Digite o novo nome:", funcionario.nome);
                let newEmail = prompt("Digite o novo email:", funcionario.email);
                let newSenha = prompt("Digite a nova senha (deixe em branco para não alterar):", "");
                let newTipoUsuario = prompt("Digite o novo tipo de usuário (admin, funcionario, outro):", funcionario.tipo_usuario || 'funcionario');

                if (newNome === null || newEmail === null || newTipoUsuario === null) {
                    alert("Edição cancelada.");
                    return;
                }

                let updatedData = {
                    id: id,
                    nome: newNome.trim(),
                    email: newEmail.trim(),
                    tipo_usuario: newTipoUsuario.trim()
                };
                if (newSenha.trim() !== "") {
                    updatedData.senha = newSenha.trim();
                }

                fetch('api/edit_funcionario.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao editar funcionário.'); });
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            alert(data.message);
                            loadFuncionarios();
                        } else {
                            alert(data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao editar funcionário:', error);
                        alert('Ocorreu um erro ao editar o funcionário: ' + error.message);
                    });
            })
            .catch(error => {
                console.error('Erro ao buscar dados do funcionário para edição:', error);
                alert('Não foi possível carregar os dados do funcionário para edição: ' + error.message);
            });
    }

    window.addNovoFuncionario = function () {
        const nome = prompt("Nome do novo funcionário:");
        const email = prompt("Email do novo funcionário:");
        const senha = prompt("Senha do novo funcionário:");
        const tipo = prompt("Tipo de usuário (admin, funcionario, outro):", "funcionario");

        if (nome && email && senha) {
            fetch('api/add_funcionarios.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha, tipo_usuario: tipo })
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao adicionar funcionário.'); });
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        loadFuncionarios();
                    } else {
                        alert(data.error);
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar funcionário:', error);
                    alert('Erro ao adicionar funcionário: ' + error.message);
                });
        } else {
            alert("Nome, email e senha são obrigatórios para adicionar um funcionário.");
        }
    };


    const addPacienteModal = document.getElementById('addPacienteModal');
    const addPacienteForm = document.getElementById('addPacienteForm');
    const openAddPacienteModalBtn = document.getElementById('openAddPacienteModal');

    if (openAddPacienteModalBtn) {
        openAddPacienteModalBtn.addEventListener('click', () => { 
            addPacienteForm.reset();
            addPacienteModal.style.display = 'flex';
        });
    }

    window.closeAddPacienteModal = function () {
        addPacienteModal.style.display = 'none';
        addPacienteForm.reset();
    };

    window.addEventListener('click', (event) => { 
        if (event.target === addPacienteModal) {
            closeAddPacienteModal();
        }
    });


    if (addPacienteForm) {
        addPacienteForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(addPacienteForm);
            const pacienteData = {};

            const checkboxFields = [
                'fisioterapia', 'pintura', 'musica', 'hidroterapia', 'informatica',
                'terapia_ocupacional', 'fonoaudiologia', 'psicologia'
            ];

            for (let [key, value] of formData.entries()) {
                if (key === 'data_nascimento') { 
                    if (value) { 
                        const parts = value.split('/'); 
                        if (parts.length === 3) {
                            pacienteData[key] = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                        } else {
                            pacienteData[key] = value;
                        }
                    } else {
                        pacienteData[key] = null; 
                    }
                } else if (key === 'matriculado') {
                    pacienteData[key] = parseInt(value);
                } else if (checkboxFields.includes(key)) {
                    pacienteData[key] = 1;
                } else if (['valor_componente_familiar', 'renda_familiar'].includes(key)) {
                    pacienteData[key] = value ? parseFloat(value) : null;
                } else if (key === 'pessoas_trabalham') {
                    pacienteData[key] = value ? parseInt(value) : null;
                } else {
                    pacienteData[key] = value;
                }
            }

            checkboxFields.forEach(field => {
                if (!formData.has(field)) {
                    pacienteData[field] = 0; 
                }
            });

            fetch('api/add_paciente.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pacienteData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao adicionar paciente.'); });
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        closeAddPacienteModal();
                        loadPacientes();
                    } else {
                        alert(data.error);
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar paciente:', error);
                    alert('Erro ao adicionar paciente: ' + error.message);
                });
        });
    }

    function loadPacientes() {
        fetch('api/get_paciente.php')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao carregar pacientes.'); });
                }
                return response.json();
            })
            .then(data => {
                var patientList = document.getElementById("patientList");
                patientList.innerHTML = "";

                if (data.error) {
                    patientList.innerHTML = `<tr><td colspan="8">${data.error}</td></tr>`;
                    if (data.error.includes('Acesso não autorizado')) {
                        alert(data.error);
                        window.location.href = 'admin.html';
                    }
                    return;
                }
                if (data.length === 0) {
                    patientList.innerHTML = '<tr><td colspan="8">Nenhum paciente cadastrado.</td></tr>';
                    return;
                }

                data.forEach((paciente) => {
                    var row = document.createElement("tr");

                    var nomeCell = document.createElement("td");
                    nomeCell.textContent = paciente.nome_completo;
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
                        editPaciente(paciente.id);
                    };
                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.textContent = "Excluir";
                    deleteButton.className = "delete-button";
                    deleteButton.onclick = function () {
                        if (confirm(`Tem certeza que deseja excluir ${paciente.nome_completo}?`)) {
                            deletePaciente(paciente.id);
                        }
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
            })
            .catch(error => {
                console.error('Erro ao carregar pacientes:', error);
                alert('Ocorreu um erro ao carregar os dados dos pacientes: ' + error.message);
            });
    }

    function deletePaciente(id) {
        fetch('api/delete_paciente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao excluir paciente.'); });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    loadPacientes();
                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir paciente:', error);
                alert('Ocorreu um erro ao excluir o paciente: ' + error.message);
            });
    }

    window.editPaciente = function(id) {
        fetch(`api/get_paciente_by_id.php?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao buscar paciente para edição.'); });
                }
                return response.json();
            })
            .then(paciente => {
                if (paciente.error) {
                    showJanelaEdicao('Erro ao Carregar Dados', paciente.error);
                    return;
                }

                document.getElementById('edit_id').value = paciente.id;
                document.getElementById('edit_nome_completo').value = paciente.nome_completo;
                document.getElementById('edit_cid').value = paciente.cid;
                document.getElementById('edit_data_nascimento').value = paciente.data_nascimento; 
                document.getElementById('edit_nome_responsavel').value = paciente.nome_responsavel;
                document.getElementById('edit_vinculo_familiar').value = paciente.vinculo_familiar;
                document.getElementById('edit_telefone').value = paciente.telefone;
                document.getElementById('edit_composicao_familiar').value = paciente.composicao_familiar;
                document.getElementById('edit_valor_componente_familiar').value = paciente.valor_componente_familiar;
                document.getElementById('edit_bpc').checked = paciente.bpc == 1; 
                document.getElementById('edit_bolsa_familia').checked = paciente.bolsa_familia == 1; 
                document.getElementById('edit_pessoas_trabalham').value = paciente.pessoas_trabalham;
                document.getElementById('edit_renda_familiar').value = paciente.renda_familiar;
                document.getElementById('edit_residencia').value = paciente.residencia;
                document.getElementById('edit_matriculado').value = paciente.matriculado; 
                document.getElementById('edit_mediador').value = paciente.mediador;
                document.getElementById('edit_serie').value = paciente.serie;
                document.getElementById('edit_escola').value = paciente.escola;
                document.getElementById('edit_nome_escola').value = paciente.nome_escola;
                document.getElementById('edit_turno').value = paciente.turno;
                document.getElementById('edit_fisioterapia').checked = paciente.fisioterapia == 1;
                document.getElementById('edit_pintura').checked = paciente.pintura == 1;
                document.getElementById('edit_musica').checked = paciente.musica == 1;
                document.getElementById('edit_hidroterapia').checked = paciente.hidroterapia == 1;
                document.getElementById('edit_informatica').checked = paciente.informatica == 1;
                document.getElementById('edit_terapia_ocupacional').checked = paciente.terapia_ocupacional == 1;
                document.getElementById('edit_fonoaudiologia').checked = paciente.fonoaudiologia == 1;
                document.getElementById('edit_psicologia').checked = paciente.psicologia == 1;

                showEditPacienteModal();
            })
            .catch(error => {
                console.error('Erro ao buscar dados do paciente para edição:', error);
                showJanelaEdicao('Erro ao Carregar Paciente', 'Não foi possível carregar os dados do paciente para edição: ' + error.message);
            });
    };

    const editPacienteForm = document.getElementById('editPacienteForm');
    if (editPacienteForm) {
        editPacienteForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const formData = new FormData(editPacienteForm);
            const updatedData = {};
            for (const [key, value] of formData.entries()) {
                if (['bpc', 'bolsa_familia', 'fisioterapia', 'pintura', 'musica', 'hidroterapia', 'informatica', 'terapia_ocupacional', 'fonoaudiologia', 'psicologia'].includes(key)) {
                    updatedData[key] = value === '1' ? 1 : 0; 
                } else {
                    updatedData[key] = value;
                }
            }
            updatedData.id = parseInt(updatedData.id);

            fetch('api/edit_pacientes.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro na rede ao editar paciente.'); });
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        showJanelaEdicao('Sucesso!', data.message);
                        closeEditPacienteModal(); 
                        loadPacientes();
                    } else {
                        showJanelaEdicao('Erro na Edição', data.error);
                    }
                })
                .catch(error => {
                    console.error('Erro ao editar paciente:', error);
                    showJanelaEdicao('Erro de Comunicação', 'Ocorreu um erro ao editar o paciente: ' + error.message);
                });
        });
    }

    function showDetails(paciente) {
        const detailCard = document.getElementById("detail-card");
        const detailContent = document.getElementById("detail-content");

        const formatBoolean = (value) => value ? 'Sim' : 'Não';

        detailContent.innerHTML = `
            <h3>Detalhes do Paciente</h3>
            <br>
            <div class="details-grid">
                <div class="detail-item"><p><strong>Nome:</strong> ${paciente.nome_completo}</p></div>
                <div class="detail-item"><p><strong>CID:</strong> ${paciente.cid}</p></div>
                <div class="detail-item"><p><strong>Data de Nascimento:</strong> ${paciente.data_nascimento}</p></div>
                <div class="detail-item"><p><strong>Nome do Responsável:</strong> ${paciente.nome_responsavel}</p></div>
                <div class="detail-item"><p><strong>Vínculo Familiar:</strong> ${paciente.vinculo_familiar}</p></div>
                <div class="detail-item"><p><strong>Telefone:</strong> ${paciente.telefone}</p></div>
                <div class="detail-item full-width"><p><strong>Composição Familiar:</strong> ${paciente.composicao_familiar}</p></div>
                <div class="detail-item"><p><strong>Valor do Componente Familiar:</strong> ${paciente.valor_componente_familiar}</p></div>
                <div class="detail-item"><p><strong>BPC:</strong> ${paciente.bpc}</p></div>
                <div class="detail-item"><p><strong>Bolsa Família:</strong> ${paciente.bolsa_familia}</p></div>
                <div class="detail-item"><p><strong>Pessoas que Trabalham:</strong> ${paciente.pessoas_trabalham}</p></div>
                <div class="detail-item"><p><strong>Renda Familiar:</strong> ${paciente.renda_familiar}</p></div>
                <div class="detail-item"><p><strong>Residência:</strong> ${paciente.residencia}</p></div>
                <div class="detail-item"><p><strong>Matriculado:</strong> ${formatBoolean(paciente.matriculado)}</p></div>
                <div class="detail-item"><p><strong>Mediador:</strong> ${paciente.mediador}</p></div>
                <div class="detail-item"><p><strong>Série:</strong> ${paciente.serie}</p></div>
                <div class="detail-item"><p><strong>Escola:</strong> ${paciente.escola}</p></div>
                <div class="detail-item"><p><strong>Nome da Escola:</strong> ${paciente.nome_escola}</p></div>
                <div class="detail-item"><p><strong>Turno:</strong> ${paciente.turno}</p></div>
                <div class="detail-item"><p><strong>Fisioterapia:</strong> ${formatBoolean(paciente.fisioterapia)}</p></div>
                <div class="detail-item"><p><strong>Pintura:</strong> ${formatBoolean(paciente.pintura)}</p></div>
                <div class="detail-item"><p><strong>Música:</strong> ${formatBoolean(paciente.musica)}</p></div>
                <div class="detail-item"><p><strong>Hidroterapia:</strong> ${formatBoolean(paciente.hidroterapia)}</p></div>
                <div class="detail-item"><p><strong>Informática:</strong> ${formatBoolean(paciente.informatica)}</p></div>
                <div class="detail-item"><p><strong>Terapia Ocupacional:</strong> ${formatBoolean(paciente.terapia_ocupacional)}</p></div>
                <div class="detail-item"><p><strong>Fonoaudiologia:</strong> ${formatBoolean(paciente.fonoaudiologia)}</p></div>
                <div class="detail-item"><p><strong>Psicologia:</strong> ${formatBoolean(paciente.psicologia)}</p></div>
            </div>
        `;

        detailCard.style.display = 'block';
    }
    
    function showAddFuncionarioModal() {
        document.getElementById('addFuncionarioModal').style.display = 'flex';
        document.getElementById('addFuncionarioForm').reset(); 
        document.getElementById('passwordMatchError').textContent = ''; 
    }

    function closeAddFuncionarioModal() {
        document.getElementById('addFuncionarioModal').style.display = 'none';
    }

    document.getElementById('openAddFuncionarioModal').addEventListener('click', showAddFuncionarioModal);

    window.addEventListener('click', (event) => {
        const addFuncionarioModal = document.getElementById('addFuncionarioModal');
        if (event.target === addFuncionarioModal) {
            closeAddFuncionarioModal();
        }
    });

    document.getElementById('addFuncionarioForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('add_nome').value;
        const email = document.getElementById('add_email').value;
        const senha = document.getElementById('add_senha').value;
        const confirm_senha = document.getElementById('add_confirm_senha').value;
        const tipo_usuario = document.getElementById('add_tipo_usuario').value;
        const passwordMatchError = document.getElementById('passwordMatchError');

        if (senha !== confirm_senha) {
            passwordMatchError.textContent = 'As senhas não coincidem!';
            return;
        } else {
            passwordMatchError.textContent = '';
        }

        try {
            const response = await fetch('api/add_funcionarios.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    tipo_usuario
                })
            });

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    showJanelaEdicao('Sucesso!', result.message);
                    closeAddFuncionarioModal();
                    loadFuncionarios(); 
                } else {
                    showJanelaEdicao('Erro!', result.error || 'Erro ao adicionar funcionário.');
                }
            } else {
                showJanelaEdicao('Erro na Requisição!', result.error || 'Ocorreu um erro ao processar sua solicitação.');
            }
        } catch (error) {
            console.error('Erro:', error);
            showJanelaEdicao('Erro de Conexão!', 'Não foi possível conectar ao servidor. Tente novamente.');
        }
    });

    document.getElementById('add_confirm_senha').addEventListener('input', function() {
        const password = document.getElementById('add_senha').value;
        const confirmPassword = this.value;
        const passwordMatchError = document.getElementById('passwordMatchError');

        if (password !== confirmPassword) {
            passwordMatchError.textContent = 'As senhas não coincidem!';
        } else {
            passwordMatchError.textContent = '';
        }
    });

    function loadFuncionarios() {
        fetch('api/get_funcionarios.php')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error || 'Erro na resposta do servidor.'); });
                }
                return response.json();
            })
            .then(funcionarios => {
                const userList = document.getElementById('userList');
                userList.innerHTML = ''; 
                if (funcionarios.length === 0) {
                    userList.innerHTML = '<tr><td colspan="4">Nenhum funcionário cadastrado.</td></tr>';
                    return;
                }
                funcionarios.forEach(funcionario => {
                    const row = userList.insertRow();
                    row.insertCell(0).textContent = funcionario.nome;
                    row.insertCell(1).textContent = funcionario.email;
                    row.insertCell(2).textContent = funcionario.tipo_usuario; 
                    const actionsCell = row.insertCell(3);

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.classList.add('edit-button');
                    editButton.onclick = () => editFuncionario(funcionario.id);
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.classList.add('delete-button');
                    deleteButton.onclick = () => deleteFuncionario(funcionario.id, funcionario.nome);
                    actionsCell.appendChild(deleteButton);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar funcionários:', error);
                showJanelaEdicao('Erro ao Carregar', error.message || 'Não foi possível carregar os funcionários.');
            });
    }

    async function editFuncionario(id) {
        try {
            const response = await fetch(`api/get_funcionario_by_id.php?id=${id}`);
            const funcionario = await response.json();

            if (!response.ok || funcionario.error) {
                throw new Error(funcionario.error || 'Funcionário não encontrado.');
            }

            document.getElementById('edit_funcionario_id').value = funcionario.id;
            document.getElementById('edit_nome').value = funcionario.nome;
            document.getElementById('edit_email').value = funcionario.email;
            document.getElementById('edit_tipo_usuario').value = funcionario.tipo_usuario;
            document.getElementById('edit_senha').value = ''; 
            document.getElementById('edit_confirm_senha').value = ''; 
            document.getElementById('editPasswordMatchError').textContent = ''; 

            document.getElementById('editFuncionarioModal').style.display = 'flex';
        } catch (error) {
            console.error('Erro ao buscar funcionário para edição:', error);
            showJanelaEdicao('Erro na Edição', error.message || 'Não foi possível carregar os dados do funcionário para edição.');
        }
    }

    function closeEditFuncionarioModal() {
        document.getElementById('editFuncionarioModal').style.display = 'none';
    }

    document.getElementById('editFuncionarioForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('edit_funcionario_id').value;
        const nome = document.getElementById('edit_nome').value;
        const email = document.getElementById('edit_email').value;
        const senha = document.getElementById('edit_senha').value;
        const confirm_senha = document.getElementById('edit_confirm_senha').value;
        const tipo_usuario = document.getElementById('edit_tipo_usuario').value;
        const editPasswordMatchError = document.getElementById('editPasswordMatchError');

        if (senha && senha !== confirm_senha) {
            editPasswordMatchError.textContent = 'As senhas não coincidem!';
            return;
        } else {
            editPasswordMatchError.textContent = '';
        }

        const data = {
            id,
            nome,
            email,
            tipo_usuario
        };
        if (senha) { 
            data.senha = senha;
        }

        try {
            const response = await fetch('api/edit_funcionarios.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    showJanelaEdicao('Sucesso!', result.message);
                    closeEditFuncionarioModal();
                    loadFuncionarios();
                } else {
                    showJanelaEdicao('Erro!', result.error || 'Erro ao atualizar funcionário.');
                }
            } else {
                showJanelaEdicao('Erro na Requisição!', result.error || 'Ocorreu um erro ao processar sua solicitação.');
            }
        } catch (error) {
            console.error('Erro:', error);
            showJanelaEdicao('Erro de Conexão!', 'Não foi possível conectar ao servidor. Tente novamente.');
        }
    });

    document.getElementById('edit_confirm_senha').addEventListener('input', function() {
        const password = document.getElementById('edit_senha').value;
        const confirmPassword = this.value;
        const errorElement = document.getElementById('editPasswordMatchError');

        if (password && password !== confirmPassword) { 
            errorElement.textContent = 'As senhas não coincidem!';
        } else {
            errorElement.textContent = '';
        }
    });

    async function deleteFuncionario(id, nome) {
        if (confirm(`Tem certeza que deseja excluir o funcionário ${nome}?`)) {
            try {
                const response = await fetch('api/delete_funcionario.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    if (result.success) {
                        showJanelaEdicao('Sucesso!', result.message);
                        loadFuncionarios(); // Recarrega a lista
                    } else {
                        showJanelaEdicao('Erro!', result.error || 'Erro ao excluir funcionário.');
                    }
                } else {
                    showJanelaEdicao('Erro na Requisição!', result.error || 'Ocorreu um erro ao processar sua solicitação.');
                }
            } catch (error) {
                console.error('Erro:', error);
                showJanelaEdicao('Erro de Conexão!', 'Não foi possível conectar ao servidor. Tente novamente.');
            }
        }
    }

    window.editFuncionario = editFuncionario;
    window.deleteFuncionario = deleteFuncionario;
    window.closeEditFuncionarioModal = closeEditFuncionarioModal;


    window.closeDetails = function () {
        const detailCard = document.getElementById("detail-card");
        detailCard.style.display = 'none';
    }

});