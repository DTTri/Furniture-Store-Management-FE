    import { useLocation } from 'react-router-dom';
import formatMoney from '../../utils/formatMoney';
import { Button } from '@mui/material';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const vnpAmount = queryParams.get('vnp_Amount');
  const vnpBankCode = queryParams.get('vnp_BankCode');
  const vnpOrderInfo = queryParams.get('vnp_OrderInfo');
  const vnpTransactionNo = queryParams.get('vnp_TransactionNo');
  const vnpPayDate = queryParams.get('vnp_PayDate');

  return (
    <div className="flex w-full h-screen items-center justify-center bg-blue-200">
      <div className="bg-white shadow-2xl max-w-[400px] w-full mx-auto p-8 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Payment Successful</h1>
        <p className="text-lg mb-2">Thank you for your payment!</p>
        <div className="text-left">
          <p className="mb-2"><strong>Amount:</strong> {formatMoney(vnpAmount?.slice(0 , -2).toString() || '')}</p>
          <p className="mb-2"><strong>Bank Code:</strong> {vnpBankCode}</p>
          <p className="mb-2"><strong>Order Info:</strong> {vnpOrderInfo}</p>
          <p className="mb-2"><strong>Transaction No:</strong> {vnpTransactionNo}</p>
          <p className="mb-2"><strong>Payment Date:</strong> {vnpPayDate}</p>
        </div>
        <Button
          variant="contained"  
          onClick={() => window.location.href = '/invoice'}
          style={{ marginTop: '16px' }}
          className=" px-4 py-2 text-white rounde ransition duration-300"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;