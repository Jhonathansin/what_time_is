var myHeaders = new Headers()
myHeaders.set('Access-Control-Allow-Origin:', '*')

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

function localidadesAleatorias (array, quantidade) {
    const localidades = []
    const tamanho = array.length
    while (localidades.length < quantidade) {
        const localidade = array[Math.floor(Math.random() * tamanho)]
        if (!(localidades.includes(localidade))) {
            localidades.push(localidade)
        }
    }
    return localidades
}

// retorna o mês em texto de acordo com a numeração passada
function retornaTextoMes(mes) {
    switch(mes) {
        case "01":
            return "Jan"
            break
        case "02":
            return "Feb"
            break
        case "03":
            return "Mar"
            break
        case "04":
            return "Apr"
            break
        case "05":
            return "May"
            break
        case "06":
            return "june"
            break
        case "07":
            return "jul"
            break
        case "08":
            return "Aug"
            break
        case "09":
            return "Sept"
            break
        case "10":
            return "Oct"
            break
        case "11":
            return "Nov"
            break
        case "12":
            return "Dec"
            break
        default:
            console.log("Mês não encontrado")
    }
}

async function horarioLocalidade(localidade) {
    let objetoData = {
        data: "",
        fuso: "",
        localidade: "",
    }
    await fetch(`http://worldtimeapi.org/api/timezone/${localidade}`, myInit).then( async response => {
        return await response.json()
    }).then(objeto => {
        const ano = objeto["datetime"].slice(0, 4)
        const mes = objeto["datetime"].slice(5, 7)
        const dia = objeto["datetime"].slice(8, 10)
        const hora = objeto["datetime"].slice(11, 13)
        const minutos = objeto["datetime"].slice(14, 16)
        const segundos = objeto["datetime"].slice(17, 19)
        const utcOffset = objeto["utc_offset"]
        const localidade = objeto["timezone"]
        
        const data = new Date(`${dia} ${retornaTextoMes(mes)} ${ano} ${hora}:${minutos}:${segundos}`)

        objetoData["data"] = data
        objetoData["fuso"] = utcOffset
        objetoData["localidade"] = localidade
    })
    return await objetoData

}

function animacaoCarregamento(div) {
    div.setAttribute("class", "carregandoAnimacao")
}

function paraAnimacaoCarregamento(div) {
    div.removeAttribute("class")
}

function requisicaoLocalidades() {
    for (let i = 0; i <= 11; i++) {
        const div = document.createElement("div")
        div.id = `tabela-horario-${i}`
        document.querySelector("main").append(div)

        animacaoCarregamento(document.querySelector(`#tabela-horario-${i}`))
    }


    fetch("http://worldtimeapi.org/api/timezone", myInit).then(async response => {
        return await response.json()
    }).then(async array => {
        const objetoLocais = []
        const localidades = localidadesAleatorias(array, 12)
        await localidades.forEach(async localidade => {
            const data = await horarioLocalidade(localidade)
            await objetoLocais.push(data)
        })
        // Verifica o tamanho do objeto, e quando tiver 12 vai renderizar na tela
        verificaObjeto(objetoLocais)
    })
}

async function verificaObjeto(objeto) {
    let verificaTamanho = setInterval(function() {
        if(objeto.length == 12) {
            // Renderiza os objetos na tela
            renderizar(objeto)
            clearInterval(verificaTamanho)
        }
    })
}

function renderizar(objeto) {
        objeto.forEach((value, index) => {
            
            const data = value.data

            const div = document.querySelector(`#tabela-horario-${index}`)

            paraAnimacaoCarregamento(div)

            const paragrafoLocalidade = document.createElement("p")
            paragrafoLocalidade.innerText = `${value.localidade}`

            const paragrafoData = document.createElement("p")
            paragrafoData.innerText = `${data.getDate()}/${Number(data.getMonth() + 1).toString().length == 1 ? "0" + Number(data.getMonth() + 1).toString() : Number(data.getMonth() + 1).toString()}/${data.getFullYear()}`
            paragrafoData.id = `data-${index}`

            const paragrafoHora = document.createElement("p")
            paragrafoHora.innerText = `${Number(data.getHours() + 1).toString().length == 1 ? "0" + Number(data.getHours() + 1).toString() : Number(data.getHours() + 1).toString()}:${data.getMinutes()}:${data.getSeconds()}`
            paragrafoHora.id = `horario-${index}`

            const paragrafoFuso = document.createElement("p")
            paragrafoFuso.innerText = `${value.fuso}`
            

            div.append(paragrafoLocalidade)
            div.append(paragrafoData)
            div.append(paragrafoHora)
            div.append(paragrafoFuso)

            setInterval(function() {
                let segundos = data.getSeconds() + 1
                data.setSeconds(segundos)
                paragrafoHora.innerText = `${Number(data.getHours() + 1).toString().length == 1 ? "0" + Number(data.getHours() + 1).toString() : Number(data.getHours() + 1).toString()}:${data.getMinutes()}:${Number(data.getSeconds() + 1).toString().length == 1 ? "0" + Number(data.getSeconds() + 1).toString() : Number(data.getSeconds() + 1).toString()}`

                let novaData = `${data.getDate()}/${Number(data.getMonth() + 1).toString().length == 1 ? "0" + Number(data.getMonth() + 1).toString() : Number(data.getMonth() + 1).toString()}/${data.getFullYear()}`
                
                if (paragrafoData.innerText != novaData) {
                    paragrafoData.innerText = `${data.getDate()}/${Number(data.getMonth() + 1).toString().length == 1 ? "0" + Number(data.getMonth() + 1).toString() : Number(data.getMonth() + 1).toString()}/${data.getFullYear()}`
                }
            }, 1000)
        })
}

document.body.onload = requisicaoLocalidades