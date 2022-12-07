const { exec } = require("child_process");

console.log('Iniciando revisión de Nexo Abogados...')
setInterval(()=> exec("npm test", (error, stdout, stderr) => {
    if (error) {
        const now = new Date(Date.now())
        console.log(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] Revisado Nexo Abogados no se encontró que el último caso sea de las materias buscadas...`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}), 30000)
