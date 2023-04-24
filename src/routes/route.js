const express = require('express')
const {exchangeRate, maxExchangeRate} = require('../controller/controller')
const router = express.Router()


router.get('/test', (req, res) => {
    console.log("i am called")
    res.send("Application Set!")
})

router.get('/currency-exchange',exchangeRate)
router.get('/convert',maxExchangeRate)

module.exports = router;