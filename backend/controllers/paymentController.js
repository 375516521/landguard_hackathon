// This controller contains payment stubs. Replace with real gateway SDK code.
exports.checkout = async (req, res, next) => {
  try {
    const { userId, plan } = req.body;
    // In production: using(Flutterwave / Paystack), return checkout URL and store pending txn.
    const fakeUrl = 'https://pay.example.com/checkout/txn123?user='+userId+'&plan='+plan;
    res.json({ success: true, checkoutUrl: fakeUrl });
  } catch (err) { next(err); }
};
exports.paymentCallback = async (req, res, next) => {
  try {
    // In production: verify payment with gateway, update user subscription status.
    const { status, transactionId, userId, plan } = req.body; // from gateway webhook/callback
    if (status === 'successful'){
      // Update user subscription in DB (not implemented here)
      return res.json({ success: true, message: 'Payment verified and subscription updated' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment failed or not verified' });
    }
  } catch (err) { next(err); }
};

// Admin: get all payments (stub)
exports.getAllPayments = async (req, res, next) => {
  try {
    // In production: fetch payment records from DB
    const fakePayments = [
      { id: 'txn123', userId: 'user1', plan: 'basic', amount: 10, status: 'successful', date: '2024-01-01' },
      { id: 'txn124', userId: 'user2', plan: 'pro', amount: 30, status: 'failed', date: '2024-01-02' }
    ];
    res.json(fakePayments);
  } catch (err) { next(err); }
};  
// Admin: get payment by ID (stub)
exports.getPaymentById = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    // In production: fetch payment record from DB
    const fakePayment = { id: paymentId, userId: 'user1', plan: 'basic', amount: 10, status: 'successful', date: '2024-01-01' };
    res.json(fakePayment);
  } catch (err) { next(err); }
};

