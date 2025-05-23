document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroCompletoForm');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Cria um objeto para armazenar os dados do formulário
        const formData = {
            nome_usuario: form.nome_usuario.value,
            cid: form.cid.value,
            data_nascimento: form.data_nascimento.value,
            nome_responsavel: form.nome_responsavel.value,
            vinculo_familiar: form.vinculo_familiar.value,
            telefone: form.telefone.value,
            composicao_familiar: form.composicao_familiar.value,
            valor_componente_familiar: form.valor_componente_familiar.value,
            bpc: form.bpc.value,
            bolsa_familia: form.bolsa_familia.value,
            pessoas_trabalham: form.pessoas_trabalham.value,
            renda_familiar: form.renda_familiar.value,
            residencia: form.residencia.value,
            matriculado: form.matriculado.value,
            mediador: form.mediador.value,
            serie: form.serie.value,
            escola: form.escola.value,
            nome_escola: form.nome_escola.value,
            turno: form.turno.value,
            fisioterapia: form.fisioterapia.value,
            pintura: form.pintura.value,
            musica: form.musica.value,
            hidroterapia: form.hidroterapia.value,
            informatica: form.informatica.value,
            terapia_ocupacional: form.terapia_ocupacional.value,
            fonoaudiologia: form.fonoaudiologia.value,
            psicologia: form.psicologia.value
        };

        // Obtém pacientes do localStorage ou cria um array vazio
        let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

        // Adiciona o novo paciente ao array
        pacientes.push(formData);

        // Armazena o array atualizado no localStorage
        localStorage.setItem('pacientes', JSON.stringify(pacientes));

        // Exibe uma mensagem de confirmação
        alert('Paciente cadastrado com sucesso!');

        // Opcional: Redirecionar para a página de listagem após o cadastro
        window.location.href = 'listagem.html';
    });

    document.addEventListener("DOMContentLoaded", function () {
        var telefoneInput = document.querySelector('input[name="telefone"]');

        telefoneInput.addEventListener('input', function () {
            var telefone = telefoneInput.value.replace(/\D/g, '');

            if (telefone.length > 2 && telefone[2] !== '9') {
                telefone = telefone.slice(0, 2) + '9' + telefone.slice(2);
            }

            var formattedTelefone = formatarTelefone(telefone);
            telefoneInput.value = formattedTelefone;
        });

        function formatarTelefone(telefone) {
            var formatted = telefone;

            if (telefone.length <= 2) {
                formatted = '(' + telefone;
            } else if (telefone.length <= 7) {
                formatted = '(' + telefone.substr(0, 2) + ') ' + telefone.substr(2);
            } else if (telefone.length <= 11) {
                formatted = '(' + telefone.substr(0, 2) + ') ' + telefone.substr(2, 5) + '-' + telefone.substr(7);
            } else {
                formatted = '(' + telefone.substr(0, 2) + ') ' + telefone.substr(2, 5) + '-' + telefone.substr(7, 4);
            }

            return formatted;
        }
    });
});
