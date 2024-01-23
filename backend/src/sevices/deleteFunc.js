const fs = require('fs');


const excluir = (arquivo) => {
    console.log("chamou")
    console.log(arquivo)
    fs.rmSync(`${arquivo}`)
}


module.exports = excluir;