const User = require("../../models/User");
const { paypal, paypalClient } = require("../../config/paypal");
 

exports.createPayPalOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    if (!user || !user.cart.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty" 
      });
    }

    const totalAmount = user.cart.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid cart total" 
      });
    }

    const shippingFee = totalAmount > 0 ? 5 : 0;
    const finalTotal = (totalAmount + shippingFee).toFixed(2); 

    const request = new paypal.orders.OrdersCreateRequest();
request.prefer("return=representation");
request.requestBody({
  intent: "CAPTURE",
  purchase_units: [
    {
      amount: {
        currency_code: "USD",
        value: finalTotal
      }
    }
  ]
});

const order = await paypalClient.execute(request);


    res.status(201).json({
      success: true,
      orderId: order.result.id,
      amount: finalTotal
    });

  } catch (err) {
    console.error("PayPal order creation error:", err);
    next(err);
  }
};
