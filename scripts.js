// 1️⃣ Seletores
let inputTexto = document.querySelector(".input-texto")
let selectIdioma = document.querySelector(".idioma")
let resultadoTraducao = document.querySelector(".tradução")
let botaoMicrofone = document.querySelector(".btn-audio")

// 2️⃣ Reconhecimento de voz
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()

recognition.lang = "pt-BR"
recognition.continuous = false
recognition.interimResults = false

recognition.onresult = function (event) {
    let textoFalado = event.results[0][0].transcript
    inputTexto.value = textoFalado
}

// 3️⃣ Clique no microfone
botaoMicrofone.addEventListener("click", () => {
    recognition.start()
})

async function traduzir() {

    let idiomaDestino = selectIdioma.value

    let endereco = "https://api.mymemory.translated.net/get?q="
        + inputTexto.value
        + "&langpair=pt-BR|" + idiomaDestino

    let resposta = await fetch(endereco)
    let dados = await resposta.json()

    resultadoTraducao.innerText = dados.responseData.translatedText
}
