function text(x) {
    if (x == 1) document.getElementById("mycode").style.display = "block"
    else document.getElementById("mycode").style.display = "none"
    return;
}

let submit = document.getElementById("submit")
let cotacaoCompra = document.getElementById("cotacao")
let cotacaoVenda = document.getElementById("cotacao")
let cotacaoTotal = 0
let cotacaoMedia = 0
let qtdItens = 0

function getSingleResult(dataCotacao) {
    return fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataCotacao}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda`)
        .then(response => response.json())
        .then((response) => {
            cotacaoCompra = response.value[0].cotacaoCompra;
            cotacaoVenda = response.value[0].cotacaoVenda;
            console.log('cotacaoVenda', cotacaoVenda)
            return console.log('cotacaoCompra', cotacaoCompra)
        })
}

function getPeriodResult(dataInicial, dataFinal) {
    return fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinal}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda`)
        .then(response => response.json())
        .then((values) => {
            return values.value.map(value => {
                console.log('ta')
                qtdItens++;
                cotacaoTotal = cotacaoTotal + value.cotacaoVenda
                cotacaoMedia = cotacaoTotal / qtdItens
            })
        })
}

submit.addEventListener("click", async () => {
    let dia1 = (document.getElementById("diaAtual").value)
    let dia2 = (document.getElementById("diaFinal").value)

    const dataInicialFormatada = new Date (dia1).toLocaleDateString("en-US");
    const dataFinalFormatada = new Date(dia2).toLocaleDateString("en-US");

    if (!dia1) return getSingleResult(dataFinalFormatada)
    await getPeriodResult(dataInicialFormatada, dataFinalFormatada)

    console.log('media', cotacaoMedia)
    console.log('itens', qtdItens)
})