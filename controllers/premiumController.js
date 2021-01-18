const session_check_controller = require('./session_check_controller.js');
const Razorpay = require('razorpay')
const db = require('../models/index');

module.exports.getPremiumPage=async (req,res)=>{
    if(session_check_controller.check_session(req,res)){
     
        res.render('premium.ejs',{session:session_check_controller.check_session(req,res),
                                    username:req.session.user,
                                    
                                     });
    }
    else{
       res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
   }
}
module.exports.buyingPackage=async(req,res)=>{
    let instance = new Razorpay({
        key_id:'rzp_test_iQtO5P0XiunwfV',
        key_secret:'lUDieUsWAEAQrrPdmThwMUAr'
    }); 
    var pack_name = req.body.pack_name;
    var amount= req.body.amount;
    let amt = amount.toString();
    console.log(amount);
    var params = {
        amount : amount,
        currency : 'INR',
        receipt :'su001',
        payment_capture: '1' 
    };
    console.log(params);

    let orderid=  await instance.orders.create(params);
    req.session.orderid = orderid;
    console.log(orderid);
    if(session_check_controller.check_session(req,res)){
     
        res.render('confirm_payment.ejs',{session:session_check_controller.check_session(req,res),
                                    username:req.session.user,
                                    orderid:orderid,
                                    amount:amount,
                                    pack_name:pack_name
                                     });
    }
    else{
       res.render('login.ejs',{session:session_check_controller.check_session(req,res), flag:true});
   }
}
module.exports.check_payment=async(req,res)=>{
   
    var body = req.body.order_id + "|"+req.body.payment_id;
    console.log(req.body);
    var crypto =  require('crypto');
    var expectedSignature = crypto.createHmac('sha256','lUDieUsWAEAQrrPdmThwMUAr')
    .update(body.toString())
    .digest('hex');
    console.log('signature : ',req.body.order_sig);
    console.log('signature : ',expectedSignature);
    var response = {'status':'failure'}
    if(expectedSignature === req.body.order_sig)
    {
         response = {'status':' cash successfully transferred'}
    }
    console.log(response);
    res.send(response);
}
