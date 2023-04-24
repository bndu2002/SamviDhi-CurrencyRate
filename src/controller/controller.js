const axios = require('axios')
const cheerio = require('cheerio')

const exchangeRate = async (req, res) => {
    try {
        console.log("hloo")

        console.log(req.query)

        let { amount, from, to } = req.query

        let result = []

        




        const responseXe = await axios.get(`https://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${from}&To=${to}`);
        const $Xe = cheerio.load(responseXe.data);
        const exchangeRateTextXe = $Xe('p.result__BigRate-sc-1bsijpp-1.iGrAod').text();
        const exchangeRateXe = parseFloat(exchangeRateTextXe.match(/\d+\.\d+/)[0]);
        let xeObj = {
            exchange_rate: exchangeRateXe,
            source: "https://www.xe.com"
        }
        result.push(xeObj)


        const responseX = await axios.get(`https://www.x-rates.com/calculator/?from=${from}&to=${to}&amount=${amount}`);

        const $X = cheerio.load(responseX.data);
        const exchangeRateTextX = $X('span.ccOutputRslt').text();
        const exchangeRateX = parseFloat(exchangeRateTextX.match(/\d+\.\d+/)[0]);
        let xObj = {
            exchange_rate: exchangeRateX,
            source: "https://www.x-rates.com"
        }
        result.push(xObj)


        const responsePaytm = await axios.get(`https://paytm.com/tools/currency-converter/amount-${amount}-from-${from}-to-${to}/`);

        const $Paytm = cheerio.load(responsePaytm.data);
        const exchangeRateTextPaytm = $Paytm('div._3KSB0').text();
        const exchangeRatePaytm = parseFloat(exchangeRateTextPaytm.match(/\d+\.\d+/)[0]);
        let payObj = {
            exchange_rate: exchangeRatePaytm,
            source: "https://paytm.com"
        }

        result.push(payObj)

        res.cookie('result', JSON.stringify(result));


        return res.status(200).send({ status: true, data: result });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const maxExchangeRate = async (req, res) => {
    try {
        console.log("from second")
        const resultString = req.cookies.result;
        console.log(resultString)
        if (!resultString) {
            return res.status(400).send({ status: false, message: 'Result not found in cookies.' });
        }
        const result = JSON.parse(resultString);


        let max = -Infinity
        let maxSource;
        let min = Infinity
        let minSource;
        for (let i of result) {
            if (i.exchange_rate > max) {
                max = i.exchange_rate
                maxSource = i.source
            }
            if (i.exchange_rate < min) {
                min = i.exchange_rate
                minSource = i.source
            }

        }

        let resultObj = {
            max_rate: {
                rate: max,
                source: maxSource
            },
            min_rate: {
                rate: min,
                source: minSource
            }
        }

        return res.status(200).send({ status: true, data: resultObj })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { exchangeRate, maxExchangeRate }

