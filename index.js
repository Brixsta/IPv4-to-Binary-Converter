const inputs = document.querySelectorAll('input[type=text]');
const outputs = document.querySelectorAll('input[type=textarea]');
const clipboardIcon = document.querySelector('.fa');
let tooltipCreated = false;

const grabAllOctets = () => {
    let result = [];
    for(let i=0; i<outputs.length; i++) {
        result.push(outputs[i].value);
    }
    return result.join(' ');
}

clipboardIcon.addEventListener('click', ()=>{
    const allOctets = grabAllOctets();
    navigator.clipboard.writeText(allOctets);
        createToolTip();
});

const createToolTip = () => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = "Copied to Clipboard!";
    clipboardIcon.appendChild(tooltip)

    if(clipboardIcon.children.length > 1) {
        clipboardIcon.removeChild(clipboardIcon.firstChild);
    }
}

const decimalToBrinary = (num) => {
    let result = [];

    if(num === 255) {
        return [1,1,1,1,1,1,1,1].join('');
    }
    if(num >= 128) {
        result.push(1);
        num -= 128;
    } else {
        result.push(0)
    }

    if(num >= 64) {
        result.push(1)
        num -= 64;
    } else {
        result.push(0)
    }

    if(num >= 32) {
        result.push(1)
        num -= 32;
    } else {
        result.push(0)
    }

    if(num >= 16) {
        result.push(1)
        num -= 16;
    } else {
        result.push(0)
    }

    if(num >= 8) {
        result.push(1)
        num -= 8;
    } else {
        result.push(0)
    }

    if(num >= 4) {
        result.push(1)
        num -= 4;
    } else {
        result.push(0)
    }

    if(num >= 2) {
        result.push(1)
        num -= 2;
    } else {
        result.push(0)
    }

    if(num >= 1) {
        result.push(1)
        num -= 1;
    } else {
        result.push(0)
    }
    return result.join('');
}

const valueChanged = (obj) => {
    if(obj.value !== obj.oldVal) {
        obj.oldVal = obj.value;
        return true;
    }
}

const numberTooLarge = (num) => {
    if(num > 255) {
        return true;
    } else {
        return false;
    }
}

const charsAreInvalid = (chars) => {
    const invalidChars = /[a-z, A-Z]/gm;
    if(invalidChars.test(chars)) {
        return true;
    } else {
        return false;
    }
}

const animate = () => {
    inputs.forEach((input,index)=>{
        const invalidChars = charsAreInvalid(input.value);
        const sizeExceeded = numberTooLarge(parseInt(input.value));
        const valueWasChanged = valueChanged(input); 

        if(invalidChars) {
            input.value = input.value.slice(0,-1);
        }

        if(sizeExceeded && !isNaN(sizeExceeded)) {
            input.value = input.value.slice(0,-1);
        }
        if(valueWasChanged) {
            const conversion = decimalToBrinary(parseInt(input.value));
            outputs[index].value = conversion;
        }
    })
    window.requestAnimationFrame(animate);
}

window.onload = () => {
    animate();
    // set the old val to null
    inputs.forEach((input)=>{
        input.oldVal = null;
    });
}