let BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
let dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        if (select.name == 'to' && currCode == "INR") {
            newOption.selected = 'selected';
        }
        if (select.name == 'from' && currCode == "USD") {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

let Btn = document.querySelector('button');
Btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('input').value;
    if (amount == "" || amount < 1) {
        amount
        document.querySelector('input').value = 1;
        amount = 1;
    }

    let fromCurr = document.querySelector(".from select").value;
    let toCurr = document.querySelector(".to select").value;
    const url = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    let finalAmount = (data[fromCurr.toLowerCase()][toCurr.toLowerCase()]*parseInt(amount)).toFixed(2);
    console.log(data);
    let msg = document.querySelector(".msg");
    msg.innerText = `${amount} ${fromCurr} = ${finalAmount} ${toCurr}`;

})