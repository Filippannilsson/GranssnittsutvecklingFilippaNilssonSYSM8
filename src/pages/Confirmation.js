import DeliveryForm from "../components/DeliveryForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummery from "../components/OrderSummery";

function Confirmation() {
  return (
    <div>
      <h1>Confirmation-page</h1>
      <DeliveryForm />
      <PaymentForm />
      {/* <OrderSummery /> */}
    </div>
  );
}

export default Confirmation;
