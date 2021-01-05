const gmkknitsInvoice = require("../Models/gmkknits_invoice");
const PostWImage = require("../Models/postWImage");

exports.invoiceUpdate = (req,res)=>{
    console.log(req.body.invoice);
    const invoice = new gmkknitsInvoice({
        invoice : req.body.invoice
    });
    invoice.save();
    console.log(invoice);
    res.status(201).json({
      message:'invoice added successfully',
      id:invoice.invoice
    });
  }