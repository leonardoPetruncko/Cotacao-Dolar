function text(x) {
    if (x == 1) document.getElementById("mycode").style.display = "block"
    else document.getElementById("mycode").style.display = "none"
    return;
}

let submit = document.getElementById("submit")
let cotacao = document.getElementById("cotacao")

function getResult ( dataCotacao ){
    return fetch ('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='`${dataCotacao}`'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda').then(response => response.json())    
}

submit.addEventListener("click", () => {


    let dia1 =(document.getElementById("diaAtual").value)
    let dia2 =(document.getElementById("diaFinal").value)

    const date = new Date(dia2).toLocaleDateString("en-US");
    getResult(date)
    
    console.log(date)

})