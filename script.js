function text(x) {
    if (x == 1) document.getElementById("mycode").style.display = "block"
    else document.getElementById("mycode").style.display = "none"
    return;
}

let submit = document.getElementById("submit")
let cotacao = document.getElementById("cotacao")

submit.addEventListener("click", () => {
    let dia1 = new Date(document.getElementById("diaAtual").value)
    let dia2 = new Date(document.getElementById("diaFinal").value)
    console.log(dia1.toLocaleString(), dia2.toLocaleString())
})