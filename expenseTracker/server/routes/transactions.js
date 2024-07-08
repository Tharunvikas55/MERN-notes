const { addIncome } = require('../controller/income')

const router=require('express').Router()

router.post('/add-income',addIncome)

module.exports=router