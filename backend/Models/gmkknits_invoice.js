const mongoose = require("mongoose");

const gmkknits_InvoiceTableSchema = mongoose.Schema(
  {
    sno:
    {type:Number},
    dc:
    {type:String},
    date:
    {type:String},
    fabric:
    {type:String},
    count:
    {type:String},
    mill:
    {type:String},
    dia:
    {type:String},
    weight:
    {type:Number},
    price:
    {type:Number},
    amount:
    {type:Number}
  });

  const gmkknits_InvoiceSchema1 = mongoose.Schema(
    {
    invoiceNo:
    {type:Number},
    invoiceDate:
    {type:String},
    gstNo:
    {type:String},
    address:
    {type:String},
    customer:
    {type:String},
    phoneNo:
    {type:String},
    job:
    {type:String},
    partyDcNo:
    {type:String},
    reference:
    {type:String},
    cgst:
    {type:Number},
    sgst:
    {type:Number},
    total:
    {type:Number},
    grandTotal:
    {type:Number},
    roundOff:
    {type:Number},
    invoiceTable:
    {type:Array},
    });

    const gmkknits_InvoiceSchema = mongoose.Schema(
        {
        invoice:
        {type:Object},
        });

  module.exports = mongoose.model('gmkknits_invoice',gmkknits_InvoiceSchema);