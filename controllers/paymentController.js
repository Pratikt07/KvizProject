const razorPay = require('../models1/razorpay.js');
const getPaymentinfo = require('../models1/getpaymentInfo.js');

exports.paymentPage = (req, res) => {
    res.sendFile(__dirname + '/public' + '/razorpay.html');
};

exports.order = (req, res) => {
    try {
        razorPay.createOrderID(req, res);
    } catch (err) {
        console.log(err);
    }
};

exports.paymentCapture = (req, res) => {
    getPaymentinfo.getPaymentDeatils(req, res);
};
