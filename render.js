//Este arquivo conecta a interface (index.html) ao processo principal (main.js)
//Escuta os cliques nos botões da interfac
//Envia pedidos ao processo principal (como selecionar arquivos ou converter algo)
//Exibe os resultados na interface, se necessário

const { ipcRenderer } = require('electron');

// Obtém elementos HTML
const fileInput = document.getElementById('fileInput');
const fileType = document.getElementById('fileType');
const convertButton = document.getElementById('convertButton');
const output = document.getElementById('output');

// Escuta o clique no botão de conversão
convertButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        output.textContent = 'Por favor, selecione um arquivo.';
        return;
    }

    const inputPath = file.path; // Caminho do arquivo selecionado
    const type = fileType.value; // Tipo de conversão escolhido
    const outputPath = `${inputPath.split('.').slice(0, -1).join('.')}.${type}`;

    try {
        switch (type) {
            case 'png':
                await ipcRenderer.invoke('convert-image', inputPath, outputPath);
                break;
            case 'pdf':
                await ipcRenderer.invoke('convert-document', inputPath, outputPath);
                break;
            case 'wav':
                await ipcRenderer.invoke('convert-audio', inputPath, outputPath);
                break;
            default:
                throw new Error('Tipo de conversão inválido.');
        }

        output.textContent = `Arquivo convertido com sucesso: ${outputPath}`;
    } catch (error) {
        output.textContent = `Erro durante a conversão: ${error.message}`;
    }
});
;
