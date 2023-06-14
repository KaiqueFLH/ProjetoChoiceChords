const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");

const modificadorNota1 = document.getElementById("modificadorNota1");
const modificadorNota2 = document.getElementById("modificadorNota2");
const modificadorNota3 = document.getElementById("modificadorNota3");

const acorde = document.getElementById("acorde");
const modificadorAcorde = document.getElementById("modificadorAcorde");


acorde.value = "0";
nota1.value = "0";
nota2.value = "0";
nota3.value = "0";
modificadorNota1.value = "0";
modificadorNota2.value = "0";
modificadorNota3.value = "0";
modificadorAcorde.value = "0";

let procura;

function buscar() {
    if (document.getElementById("enviar").lastChild != null) {
        document.getElementById("enviar").removeChild(document.getElementById("enviar").lastChild);
    }
    let erro = document.createElement("p");
    erro.style.color = "red";

    if (this.procura == "Acorde") {
        if (acorde.value != "0") {
            defineNota();
        }
        else if (nota1.value != "0" &&
            nota2.value != "0" &&
            nota3.value != "0") {
            defineAcorde();

        }
        else {
            erro.innerText = "Você precisa inserir um acorde válido";
            document.getElementById("enviar").appendChild(erro)
        }
    }
    if (this.procura == "Nota") {
        if (nota1.value != "0" &&
            nota2.value != "0" &&
            nota3.value != "0") {
            defineAcorde();
        }
        else {
            erro.innerText = "Você precisa inserir 3 notas válidas";
            document.getElementById("enviar").appendChild(erro)
        }
    }
    if (this.procura == undefined) {
        erro.innerText = "Você precisa inserir algo válido";
        document.getElementById("enviar").appendChild(erro)
    }
}

function procuraAcorde() {
    this.procura = "Acorde";
    if (acorde.value == "3" || acorde.value == "6.5") {
        modificadorAcorde.children[1].disabled = true;
        modificadorAcorde.children[3].disabled = true;
        modificadorNota1.value = "0";
    } else {
        modificadorAcorde.children[1].disabled = false;
        modificadorAcorde.children[3].disabled = false;
    }
}
function procuraNota() {
    this.procura = "Nota";
    if (nota1.value == "3" || nota1.value == "6.5") {
        modificadorNota1.children[1].disabled = true;
        modificadorNota1.value = "0";
    } else {
        modificadorNota1.children[1].disabled = false;
    }
    if (nota2.value == "3" || nota2.value == "6.5") {
        modificadorNota2.children[1].disabled = true;
        modificadorNota2.value = "0";

    } else {
        modificadorNota2.children[1].disabled = false;
    }
    if (nota3.value == "3" || nota3.value == "6.5") {
        modificadorNota3.children[1].disabled = true;
        modificadorNota3.value = "0";

    } else {
        modificadorNota3.children[1].disabled = false;
    }
}

function defineAcorde() {
    let teste1 = testePrimeira(nota1, nota2, nota3, modificadorNota1, modificadorNota2, modificadorNota3);
    let teste2 = testePrimeira(nota2, nota1, nota3, modificadorNota2, modificadorNota1, modificadorNota3);
    let teste3 = testePrimeira(nota3, nota2, nota1, modificadorNota3, modificadorNota2, modificadorNota1);
    if (teste1 != "") {
        acorde.value = JSON.parse(nota1.value);
        modificadorAcorde.value = teste1;
        mudarTeclado();

    }
    else if (teste2 != "") {
        acorde.value = JSON.parse(nota2.value);
        modificadorAcorde.value = teste2;
        mudarTeclado();

    }
    else if (teste3 != "") {
        acorde.value = JSON.parse(nota3.value);
        modificadorAcorde.value = teste3;
        mudarTeclado();
    }
    else {
        let erro = document.createElement("p");
        erro.style.color = "red";
        erro.innerText = "Esse acorde não é um acorde válido conhecido!";
        document.getElementById("enviar").appendChild(erro)
    }
}

function defineNota() {
    nota1.value = acorde.value;
    let indiceSegunda = defineIndiceSegunda();
    let indiceTerca = defineIndiceTerca();

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
        indiceSegunda -= 6;
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
    mudarTeclado();
}

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

function mudarTeclado() {
    let indiceSegunda = defineIndiceSegunda();
    let indiceTerca = defineIndiceTerca();

    for (let tecla of document.getElementById("fundoTeclado").children) {
        console.log("a");
        if (tecla.id == JSON.parse(nota1.value) + JSON.parse(modificadorNota1.value) ||
            tecla.id == indiceSegunda ||
            tecla.id == indiceTerca) {
            tecla.style.backgroundColor = "#D16E26"
        }
        else if (tecla.classList.contains("nota")) {
            tecla.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }
        else if (tecla.classList.contains("sustenido")) {
            tecla.style.backgroundColor = "#2F2929"
        }
    }
}

function defineIndiceSegunda() {
    if (modificadorAcorde.value == "#") {
        return JSON.parse(nota1.value) + 2.5;
    }
    else if (modificadorAcorde.value == "#m") {
        return JSON.parse(nota1.value) + 2
    }
    else if (modificadorAcorde.value == "m") {
        return JSON.parse(nota1.value) + 1.5;
    }
    else {
        return JSON.parse(nota1.value) + 2;
    }
}

function defineIndiceTerca() {
    if (modificadorAcorde.value == "#") {
        return JSON.parse(nota1.value) + 4;
    }
    else if (modificadorAcorde.value == "#m") {
        return JSON.parse(nota1.value) + 4;
    }
    else if (modificadorAcorde.value == "m") {
        return JSON.parse(nota1.value) + 3.5;
    }
    else {
        return JSON.parse(nota1.value) + 3.5;
    }

}

function abrirPopup(){
    document.getElementById("defoco").style.display = "flex";
}
function fechar(){
    document.getElementById("defoco").style.display = "none";
    
}
