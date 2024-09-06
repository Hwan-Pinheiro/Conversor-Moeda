document.getElementById('convertButton').addEventListener('click', convertCurrency);

const apiKey = '448d893ccbfd53f5cc872513'; 

async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (amount === '' || isNaN(amount)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'error') {
            alert('Erro ao buscar a taxa de câmbio.');
            return;
        }

        const exchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

        addToHistory(`${amount} ${fromCurrency} -> ${convertedAmount} ${toCurrency}`);
    } catch (error) {
        alert('Erro ao realizar a conversão. Verifique sua conexão com a internet.');
        console.error('Erro:', error);
    }
}

function addToHistory(conversion) {
    const history = document.getElementById('history');
    const newItem = document.createElement('li');
    newItem.textContent = conversion;
    history.appendChild(newItem);
}
