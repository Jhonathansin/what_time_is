function animacaoCarregamento(div) {
    div.setAttribute("class", "carregandoAnimacao")
}

function paraAnimacaoCarregamento(div) {
    div.removeAttribute("class")
}

async function horarioIp() {
    const div = document.createElement("div")
    div.id = `tabela-horario-0`

    document.querySelector("main").append(div)
    animacaoCarregamento(document.querySelector(`#tabela-horario-0`))
    fetch(`http://worldtimeapi.org/api/ip`).then(async response => {
        return await response.json()
    }).then(obj => {
        const localidade = obj["timezone"]
        const dateTime = obj["datetime"]
        const ano = dateTime.slice(0, 4)
        const mes = dateTime.slice(5, 7)
        const dia = dateTime.slice(8, 10)
        const hora = dateTime.slice(11, 13)
        const minutos = dateTime.slice(14, 16)
        const segundos = dateTime.slice(17, 19)

        const data = new Date(`${mes} ${dia} ${ano} ${hora}:${minutos}:${segundos}`)
        
        const fuso = obj["utc_offset"]

        const ip = obj["client_ip"]

        const objHorario = {
            localidade,
            data,
            fuso,
            ip
        }

        renderizar(objHorario)

    })
}

function renderizar(obj) {
    const div = document.querySelector(`#tabela-horario-0`)

    paraAnimacaoCarregamento(div)

    const paragrafoLocalidade = document.createElement("p")
    paragrafoLocalidade.innerText = obj["localidade"]

    const paragrafoData = document.createElement("p")
    paragrafoData.innerText = `${Number(obj.data.getDate()).toString().length == 1 ? "0" + Number(obj.data.getDate()) : Number(obj.data.getDate())}/${Number(obj.data.getMonth() + 1).toString().length == 1 ? "0" + Number(obj.data.getMonth() + 1).toString() : Number(obj.data.getMonth() + 1).toString()}/${obj.data.getFullYear()}`

    const paragrafoHora = document.createElement("p")
    paragrafoHora.innerText = `${Number(obj.data.getHours()).toString().length == 1 ? "0" + Number(obj.data.getHours()).toString() : Number(obj.data.getHours()).toString()}:${Number(obj.data.getMinutes()).toString().length == 1 ? "0" + Number(obj.data.getMinutes()).toString() : Number(obj.data.getMinutes()).toString()}:${Number(obj.data.getSeconds()).toString().length == 1 ? "0" + Number(obj.data.getSeconds()).toString() : Number(obj.data.getSeconds()).toString()}`

    const pararafoFuso = document.createElement("p")
    pararafoFuso.innerText = obj["fuso"]

    const paragrafoIp = document.createElement("p")
    paragrafoIp.innerText = `IP: ${obj["ip"]}`

    div.append(paragrafoLocalidade)
    div.append(paragrafoData)
    div.append(paragrafoHora)
    div.append(pararafoFuso)
    div.append(paragrafoIp)

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



document.body.onload = horarioIp