let clearButton = document.querySelector(".C")
let input = document.querySelector(".input")
console.log(clearButton)

//CLEARS THE INPUT
clearButton.addEventListener('click', ()=>{
    input.textContent = "0"
})