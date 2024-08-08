

document.getElementById("cep").addEventListener("input", consultarCEP);

async function consultarCEP() {
    const cepInput = document.getElementById("cep");
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            console.error("CEP não encontrado.");
            // Trate o erro conforme sua necessidade
        } else {
            console.log("Dados do endereço:", data);
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;

        }
    } catch (error) {
        console.error("Erro ao consultar o CEP:", error);
    }
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const nome = document.getElementById("nome").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const mensagem = document.getElementById("mensagem").value;

   
    // Verifica se contém apenas números
    const regexNumeros = /^\d+$/;

    if (!regexNumeros.test(cep)) {
        alert("Por favor, insira um CEP válido (apenas números).");
        return;
    }

    if (!regexNumeros.test(numero)) {
        alert("Por favor, insira um NÚMERO válido (apenas números).");
        return;
    }

    
    const mensagemWhatsApp = `Cliente: ${nome}%0AEndereço: ${logradouro}, ${bairro}, ${numero}, ${complemento}, ${cep}%0AComplemento/Ponto de Referência: ${complemento}%0APedido: ${mensagem}`;

    // Abre a tela do WhatsApp em outra aba
    window.open(`https://api.whatsapp.com/send?phone=+5521982533483&text=${mensagemWhatsApp}`, '_blank');
});
