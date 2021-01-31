const selectContinentes = document.querySelector("#continentes")
const selectPaises = document.querySelector("#paises")

function animacaoPaises() {
    const paises = document.querySelector("#paises")
    paises.setAttribute("class", "carregando")
}

function paraAnimacaoPaises() {
    const paises = document.querySelector("#paises")
    paises.removeAttribute("class")
}

selectContinentes.onchange = function() {
    document.querySelector("#pais").innerHTML = ""
    animacaoPaises()
    fetch(`https://worldtimeapi.org/api/timezone/${this.value}`).then(async response => {
        paraAnimacaoPaises()
        return await response.json()
    }).then(paises => {
        const selectPaises = document.querySelector("#paises")

        selectPaises.innerHTML = ""

        const optionDefault = document.createElement("option")
        optionDefault.selected = true
        optionDefault.disabled = true
        optionDefault.innerText = "Selecione..."
        
        selectPaises.append(optionDefault)

        paises.forEach(pais => {
            const option = document.createElement("option")
            option.value = pais
            option.textContent = pais
            selectPaises.append(option)
        })
    })
}

function animacaoPais() {
    const paises = document.querySelector("#pais")
    paises.setAttribute("class", "carregando2")
}

function paraAnimacaoPais() {
    const paises = document.querySelector("#pais")
    paises.removeAttribute("class")
}

paises.onchange = function() {
    document.querySelector("#pais").innerHTML = ""
    animacaoPais()
    fetch(`https://worldtimeapi.org/api/timezone/${this.value}`).then(async response => {
        paraAnimacaoPais()
        return await response.json()
    }).then(pais => {
        const ano = pais["datetime"].slice(0, 4)
        const mes = pais["datetime"].slice(5, 7)
        const dia = pais["datetime"].slice(8, 10)
        const hora = pais["datetime"].slice(11, 13)
        const minutos = pais["datetime"].slice(14, 16)
        const segundos = pais["datetime"].slice(17, 19)
        const fuso = pais["utc_offset"]
        const localidade = pais["timezone"]

        const data = new Date(`${mes} ${dia} ${ano} ${hora}:${minutos}:${segundos}`)
        

        const objHorario = {
            localidade,
            data,
            fuso,
        }

        renderizaPais(objHorario)
    })
}

function renderizaPais(obj) {
    const pais = document.querySelector("#pais")

    pais.innerHTML = ""

    const paragrafoLocalidade = document.createElement("p")
    paragrafoLocalidade.innerText = obj["localidade"]

    const paragrafoData = document.createElement("p")
    paragrafoData.innerText = `${Number(obj.data.getDate()).toString().length == 1 ? "0" + Number(obj.data.getDate()) : Number(obj.data.getDate())}/${Number(obj.data.getMonth() + 1).toString().length == 1 ? "0" + Number(obj.data.getMonth() + 1).toString() : Number(obj.data.getMonth() + 1).toString()}/${obj.data.getFullYear()}`

    const paragrafoHora = document.createElement("p")
    paragrafoHora.innerText = `${Number(obj.data.getHours()).toString().length == 1 ? "0" + Number(obj.data.getHours()).toString() : Number(obj.data.getHours()).toString()}:${Number(obj.data.getMinutes()).toString().length == 1 ? "0" + Number(obj.data.getMinutes()).toString() : Number(obj.data.getMinutes()).toString()}:${Number(obj.data.getSeconds()).toString().length == 1 ? "0" + Number(obj.data.getSeconds()).toString() : Number(obj.data.getSeconds()).toString()}`

    const pararafoFuso = document.createElement("p")
    pararafoFuso.innerText = obj["fuso"]

    pais.append(paragrafoLocalidade)
    pais.append(paragrafoData)
    pais.append(paragrafoHora)
    pais.append(pararafoFuso)

    setInterval(function() {
        let segundos = obj.data.getSeconds() + 1
        obj.data.setSeconds(segundos)
        paragrafoHora.innerText = `${Number(obj.data.getHours() + 1).toString().length == 1 ? "0" + Number(obj.data.getHours() + 1).toString() : Number(obj.data.getHours() + 1).toString()}:${obj.data.getMinutes()}:${Number(obj.data.getSeconds() + 1).toString().length == 1 ? "0" + Number(obj.data.getSeconds() + 1).toString() : Number(obj.data.getSeconds() + 1).toString()}`

        let novaData = `${obj.data.getDate()}/${Number(obj.data.getMonth() + 1).toString().length == 1 ? "0" + Number(obj.data.getMonth() + 1).toString() : Number(obj.data.getMonth() + 1).toString()}/${obj.data.getFullYear()}`
        
        if (paragrafoData.innerText != novaData) {
            paragrafoData.innerText = `${obj.data.getDate()}/${Number(obj.data.getMonth() + 1).toString().length == 1 ? "0" + Number(obj.data.getMonth() + 1).toString() : Number(data.getMonth() + 1).toString()}/${obj.data.getFullYear()}`
        }
    }, 1000)
}