const {Router} = require("express")

const emiRoutes=Router();

emiRoutes.get("/",(req,res)=>{
    let {amount,rate,tenure} = req.query
    if(!amount || !rate || !tenure){
        res.send({"msg":"All fields are Required!!"})
    }
    amount=Number(amount)
    rate=Number(rate)
    tenure=Number(tenure)
    let r=rate/12/100
    let emi=amount*r*(1+r)*tenure / ((1+r)*tenure - 1)
    let totalPayment=emi*tenure
    let interestPayable=Math.abs(emi-amount)
    res.send({"emi":emi, "interestPayable":interestPayable, "totalRepayment":totalPayment})
})

module.exports={emiRoutes}