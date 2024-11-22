//Este arquivo é responsável por criar a janela principal do aplicativo e gerenciar a comunicação com o front-end.
//Recebendo comandos do front-end (por exemplo, pedir para converter um arquivo) e repassar para os módulos que fazem a conversão.

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    // Gerencia a seleção de arquivos
    ipcMain.handle('select-files', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile', 'multiSelections']
        });
        return result.filePaths;
    });

    ipcMain.handle('select-folder', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        });
        return result.filePaths[0];
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});



const { convertImage } = require('./converters/imageConverter');
const { convertAudio } = require('./converters/audioConverter');
const { convertDocxToPdf } = require('./converters/documentConverter');

ipcMain.handle('convert-image', async (event, inputPath, outputPath) => {
    await convertImage(inputPath, outputPath);
});

ipcMain.handle('convert-audio', async (event, inputPath, outputPath) => {
    await convertAudio(inputPath, outputPath);
});

ipcMain.handle('convert-document', async (event, inputPath, outputPath) => {
    await convertDocxToPdf(inputPath, outputPath);
});

//main.js: Gerencia a janela e a comunicação entre front-end e conversores.
//index.html: Mostra os botões e a interface.
//renderer.js: Conecta os botões à lógica de conversão.
//Conversores: Fazem o trabalho pesado de transformar os arquivos.
