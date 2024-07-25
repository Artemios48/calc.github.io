let RunningTotal = 0
let buffer= '0'
let PreviousOp

const screen = document.querySelector('.screen')

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value)
    }else{
        handleNumber(value)
    }
    screen.innerText = buffer
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0'
            RunningTotal = 0
            break
        case '=':
            if(PreviousOp === null){
                return
            }
            flushOp(parseInt(buffer))
            PreviousOp = null
            buffer = RunningTotal
            RunningTotal = 0
            break
        case '←':
            if(buffer.length ===1){
                buffer = '0'
                
            }else{
                buffer = buffer.substring(0,buffer.length-1)
            }
            break
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol)
            break
    }

}
function handleMath(symbol){
    if (buffer === '0'){
        return
    }
    const intBuffer =parseInt(buffer)
    if (RunningTotal === 0){
        RunningTotal = intBuffer
    }else{
        flushOp(intBuffer)
        PreviousOp = symbol
        buffer = '0'
    }

}
function flushOp(intBuffer){
    if (PreviousOp === '+'){
        RunningTotal +=intBuffer
    }else if (PreviousOp === '−'){
        RunningTotal -= intBuffer
    }else if (PreviousOp === '×'){
        RunningTotal *= intBuffer
    }else if (PreviousOp === '÷'){
        RunningTotal /= intBuffer
    }
}
function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString
    }else{
        buffer +=numberString
    }

}
function init(){
    document.querySelector('#calc-btns').
    addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}
init();