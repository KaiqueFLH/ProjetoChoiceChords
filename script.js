// Variáveis usadas no código
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");

const modificadorNota1 = document.getElementById("modificadorNota1");
const modificadorNota2 = document.getElementById("modificadorNota2");
const modificadorNota3 = document.getElementById("modificadorNota3");

const acorde = document.getElementById("acorde");
const modificadorAcorde = document.getElementById("modificadorAcorde");

// Definindo valores as variáveis
acorde.value = "0";
nota1.value = "0";
nota2.value = "0";
nota3.value = "0";
modificadorNota1.value = "0";
modificadorNota2.value = "0";
modificadorNota3.value = "0";
modificadorAcorde.value = "0";

let procura;

// Busca o acorde ou a nota para completar o que está faltando
function buscar() {
    if (this.procura == "Acorde") {
        if (acorde.value != "0") {
            defineNota();
        }
        else if (acorde.value == "0") {
            document.getElementById("blur").style.display = "flex";
            document.getElementById("erroAcordeVazio").classList.remove("popupFechar")
            document.getElementById("erroAcordeVazio").classList.add("popup")
            document.getElementById("erroAcordeVazio").style.display = "flex";
        }
        else if (nota1.value != "0" &&
            nota2.value != "0" &&
            nota3.value != "0") {
            defineAcorde();

        }
    }
    if (this.procura == "Nota") {
        if (nota1.value != "0" &&
            nota2.value != "0" &&
            nota3.value != "0") {
            defineAcorde();
        }
        else if (nota1.value == "0" &&
            nota2.value == "0" &&
            nota3.value == "0" &&
            modificadorNota1.value == "0" &&
            modificadorNota2.value == "0" &&
            modificadorNota3.value == "0") {
            defineNota();
        }
        else {
            document.getElementById("blur").style.display = "flex";
            document.getElementById("erroNotaVazio").classList.remove("popupFechar")
            document.getElementById("erroNotaVazio").classList.add("popup")
            document.getElementById("erroNotaVazio").style.display = "flex";
        }
    }
    if (this.procura == undefined) {
        document.getElementById("blur").style.display = "flex";
        document.getElementById("erroTudoVazio").classList.remove("popupFechar")
        document.getElementById("erroTudoVazio").classList.add("popup")
        document.getElementById("erroTudoVazio").style.display = "flex";
    }
}

// Define que estamos procurando uma nota atraves do acorde
function procuraPorAcorde() {
    this.procura = "Acorde";
    if (acorde.value == "3" || acorde.value == "6.5") {
        modificadorAcorde.children[1].disabled = true;
        modificadorAcorde.children[3].disabled = true;
        if (modificadorAcorde.value != "0" && modificadorAcorde.value != "m") {
            modificadorAcorde.value = "0";
        }
    } else {
        modificadorAcorde.children[1].disabled = false;
        modificadorAcorde.children[3].disabled = false;
    }
}

// Define que estamos procurando um acorde atraves das notas
 async function procuraPorNota() {
    this.procura = "Nota";
    if (nota1.value == "3" || nota1.value == "6.5") {
        modificadorNota1.children[1].disabled = true;
        if (modificadorNota1.value != "0") {
            modificadorNota1.value = "0";
        }
    } else {
        modificadorNota1.children[1].disabled = false;
    }
    if (nota2.value == "3" || nota2.value == "6.5") {
        modificadorNota2.children[1].disabled = true;
        if (modificadorNota2.value != "0") {
            modificadorNota2.value = "0";
        }

    } else {
        modificadorNota2.children[1].disabled = false;
    }
    if (nota3.value == "3" || nota3.value == "6.5") {
        modificadorNota3.children[1].disabled = true;
        if (modificadorNota3.value != "0") {
            modificadorNota3.value = "0";
        }

    } else {
        modificadorNota3.children[1].disabled = false;
    }

    return "a"
}

//Toca a nota e já define ela como laranja no teclado
 function notaSendoSelecionada(event) {
    let input = event.target.id;
    let nota, modificador;

    //define qual nota que está sendo iserida (1, 2, ou 3)
    if (input == "nota1" || input == "modificadorNota1") {
        nota = JSON.parse(nota1.value);
        modificador = JSON.parse(modificadorNota1.value);
    }
    else if (input == "nota2" || input == "modificadorNota2") {
        nota = JSON.parse(nota2.value);
        modificador = JSON.parse(modificadorNota2.value);

    } else {
        nota = JSON.parse(nota3.value);
        modificador = JSON.parse(modificadorNota3.value);
    }

    procuraPorNota();

    let teclado = document.getElementById("fundoTeclado").children;
    let nota1Value = JSON.parse(nota1.value) + JSON.parse(modificadorNota1.value);
    let nota2Value = JSON.parse(nota2.value) + JSON.parse(modificadorNota2.value);
    let nota3Value = JSON.parse(nota3.value) + JSON.parse(modificadorNota3.value);

    for (let tecla of teclado) {
        if (tecla.id == nota + modificador) {
            new Audio("./notas/" + JSON.stringify(nota + modificador) + ".mp3").play()
        }
        if (tecla.id == nota2Value || 
            tecla.id == nota3Value ||
            tecla.id == nota1Value) {
            tecla.style.backgroundColor = "#D16E26";
        } else if (tecla.classList.contains("nota")) {
            tecla.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        } else if (tecla.classList.contains("sustenido")) {
            tecla.style.backgroundColor = "#2F2929"
        }
    }
}

// Define o acorde a partir das notas
async function defineAcorde() {
    let teste1 = testePrimeira(nota1, nota2, nota3, modificadorNota1, modificadorNota2, modificadorNota3);
    let teste2 = testePrimeira(nota2, nota1, nota3, modificadorNota2, modificadorNota1, modificadorNota3);
    let teste3 = testePrimeira(nota3, nota2, nota1, modificadorNota3, modificadorNota2, modificadorNota1);
    if (teste1 != "") {
        acorde.value = await JSON.parse(nota1.value);
        modificadorAcorde.value = teste1;
        mudarTeclado(nota1, modificadorNota1);
    }
    else if (teste2 != "") {
        acorde.value = await JSON.parse(nota2.value);
        modificadorAcorde.value = teste2;
        mudarTeclado(nota2, modificadorNota2);
    }
    else if (teste3 != "") {
        acorde.value = await JSON.parse(nota3.value);
        modificadorAcorde.value = teste3;
        mudarTeclado(nota3, modificadorNota3);
    }
    else {
        document.getElementById("blur").style.display = "flex";
        document.getElementById("erroAcordeInvalido").classList.remove("popupFechar")
        document.getElementById("erroAcordeInvalido").classList.add("popup")
        document.getElementById("erroAcordeInvalido").style.display = "flex";
    }
}

// Define as notas apartir do acorde
function defineNota() {
    nota1.value = acorde.value;
    let indiceSegunda = defineIndiceSegunda(nota1);
    let indiceTerca = defineIndiceTerca(nota1);

    if (modificadorAcorde.value == "#") {
        modificadorNota1.value = 0.5;
    }
    else if (modificadorAcorde.value == "#m") {
        modificadorNota1.value = 0.5;
    }
    else if (modificadorAcorde.value == "m") {
        modificadorNota1.value = "0";
    }
    else {
        modificadorNota1.value = "0";
    }

    if (indiceSegunda > 6.5) {
        indiceSegunda -= 6;
    }
    if (indiceTerca > 6.5) {
        indiceTerca -= 6;
    }

    for (let opcao of nota1.children) {
        if (opcao.value == indiceSegunda) {
            nota2.value = opcao.value;
            modificadorNota2.value = "0"
        }
        if (opcao.value == indiceSegunda - 0.5) {
            nota2.value = opcao.value;
            modificadorNota2.value = "0.5"
        }
    }
    for (let opcao of nota1.children) {
        if (opcao.value == indiceTerca) {
            nota3.value = opcao.value;
            modificadorNota3.value = "0"
        }
        if (opcao.value == indiceTerca - 0.5) {
            nota3.value = opcao.value;
            modificadorNota3.value = "0.5"
        }
    }
    mudarTeclado(nota1, modificadorNota1);
}

// testa se a nota é a primeira do acorde
function testePrimeira(notaA, notaB, notaC, modificadorA, modificadorB, modificadorC) {
    let primeira = JSON.parse(notaA.value) + JSON.parse(modificadorA.value);
    let nota1 = JSON.parse(notaB.value) + JSON.parse(modificadorB.value);
    let nota2 = JSON.parse(notaC.value) + JSON.parse(modificadorC.value);

    indiceSegunda = primeira + 2;
    indiceTerca = primeira + 3.5;

    if (indiceSegunda > 6.5) {
        indiceSegunda -= 6;
    }
    if (indiceTerca > 6.5) {
        indiceTerca -= 6;
    }

    if ((nota1 == indiceSegunda && nota2 == indiceTerca) ||
        (nota2 == indiceSegunda && nota1 == indiceTerca)) {
        if (modificadorA.value == "0.5") {
            return "#"
        }
        return "0"
    }

    indiceSegunda = primeira + 1.5;
    indiceTerca = primeira + 3.5;

    if (indiceSegunda > 6.5) {
        indiceSegunda -= 6;
    }
    if (indiceTerca > 6.5) {
        indiceTerca -= 6;
    }

    if ((nota1 == indiceSegunda && nota2 == indiceTerca) ||
        (nota2 == indiceSegunda && nota1 == indiceTerca)) {
        if (modificadorA.value == "0.5") {
            return "#m"
        }
        return "m"
    }

    return ""
}

// Muda a cor do teclado através do acorde definido
async function mudarTeclado(nota, modNota) {

    let indiceSegunda = await defineIndiceSegunda(acorde);
    let indiceTerca = await defineIndiceTerca(acorde);

    for (let tecla of document.getElementById("fundoTeclado").children) {
        let nota1Value = JSON.parse(nota.value) + JSON.parse(modNota.value);
        console.log(nota1Value)
        if (tecla.id == nota1Value ||
            tecla.id == indiceSegunda ||
            tecla.id == indiceTerca) {
            tecla.style.backgroundColor = "#D16E26"
            let id = tecla.id
            new Audio("./notas/" + id + ".mp3").play()
        }
        else if (tecla.classList.contains("nota")) {
            tecla.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }
        else if (tecla.classList.contains("sustenido")) {
            tecla.style.backgroundColor = "#2F2929"
        }
    }
}

// Define a segunda nota do acorde  
function defineIndiceSegunda(nota) {
    if (modificadorAcorde.value == "#") {
        return JSON.parse(nota.value) + 2.5;
    }
    else if (modificadorAcorde.value == "#m") {
        return JSON.parse(nota.value) + 2;
    }
    else if (modificadorAcorde.value == "m") {
        return JSON.parse(nota.value) + 1.5;
    }
    else {
        return JSON.parse(nota.value) + 2;
    }
}

// Define a terceira nota do acorde
function defineIndiceTerca(nota) {
    if (modificadorAcorde.value == "#") {
        return JSON.parse(nota.value) + 4;
    }
    else if (modificadorAcorde.value == "#m") {
        return JSON.parse(nota.value) + 4;
    }
    else if (modificadorAcorde.value == "m") {
        return JSON.parse(nota.value) + 3.5;
    }
    else {
        return JSON.parse(nota.value) + 3.5;
    }

}


// Função para abrir e fechar Popup
function abrirPopup() {
    document.getElementById("blur").style.display = "flex";
    document.getElementById("instrucoes").classList.remove("popupFechar")
    document.getElementById("instrucoes").classList.add("popup")

    document.getElementById("instrucoes").style.display = "flex";
}
function fechar(id) {

    document.getElementById(id).classList.remove("popup")
    document.getElementById(id).classList.add("popupFechar")


    setTimeout(() => {
        document.getElementById("blur").style.display = "none";
        document.getElementById(id).style.display = "none";
    }, "250");
}

function mudarTema(){
    // --fonte: #fff;
    // --fundoGeral:#2F2929;
    // --fundoCabecalho:#44362D;
    // --destaque:#D16E26;
    // --fundoInput:rgba(255, 255, 255, 0.04);
    // --sustenido:#2F2929;

    let html = document.querySelector("html")
    let imagem1 = document.getElementsByClassName("imagemH1")
    let imagem2 = document.getElementsByClassName("imagemH1Dois")

    

    if(getComputedStyle(html).getPropertyValue("--fundoGeral")== "#2F2929"){
        html.style.setProperty("--fundoGeral","#CEBEA0")
        html.style.setProperty("--fundoInput","rgba(255,255,255,0.15)")
        html.style.setProperty("--fundoBotao","#422500")
        html.style.setProperty("--destaque","#422500")
        html.style.setProperty("--sustenido","#422500")
        html.style.setProperty("--fonte","#422500")
        imagem1[0].setAttribute("src", "./imagens/notaTemaWhite.png")
        imagem2[0].setAttribute("src", "./imagens/notaTemaWhite.png")
    }
    else{
        html.style.setProperty("--fundoGeral","#2F2929")
        html.style.setProperty("--fundoInput","rgba(255, 255, 255, 0.04)")
        html.style.setProperty("--fundoBotao","rgba(255, 255, 255, 0.04)")
        html.style.setProperty("--destaque","#D16E26")
        html.style.setProperty("--sustenido","#2F2929")
        html.style.setProperty("--fonte","#fff")
        imagem1[0].setAttribute("src", "./imagens/nota-musical.png")
        imagem2[0].setAttribute("src", "./imagens/nota-musical.png")
    }
}