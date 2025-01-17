import { WarrantyOrder } from "../../entities";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";

function printWarrantyOrder(warrantyOrder: WarrantyOrder) {
  const printWindow = window.open("", "", "height=800,width=600");
  if (printWindow) {
    printWindow.document.write(`
        <html>
      <head>
        <title>Warranty Order</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .warranty-order-header {
            text-align: center;
            color: red;
            margin-bottom: 10px;
          }
          .warranty-order-header .company-name {
            font-size: 18px;
            font-weight: bold;
          }
          .warranty-order-header .details {
            font-size: 12px;
          }
          .warranty-order-header .title {
            font-size: 20px;
            margin-top: 10px;
          }
          .warranty-order-content {
            margin: 20px 0;
            font-size: 12px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
          }
          .footer .sign {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
          }
          .footer .sign div {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="warranty-order-header">
          <div class="company-name">MODULO FURNITURE</div>
          <div class="details">
            Address: Thu Duc district, Ho Chi Minh city<br>
            Phone: 0(028) 372 52002<br>
            * Mobile: 0128.258.603<br>
          </div>
          <div class="title">
          Warranty Order
          </div>
          <div class="sub-title">
            RETAIL FURNITURE STORE 
          </div>
        </div>
        <div class="warranty-order-content">
            <p><strong>Description:</strong> ${warrantyOrder.description}</p>
            <p><strong>Details:</strong> ${warrantyOrder.details}</p>
            <p><strong>Cost:</strong> ${formatMoney(warrantyOrder.cost)}</p>
            <p><strong>Status:</strong> ${warrantyOrder.status}</p>
            <p><strong>Estimate Finish Date:</strong> ${
              warrantyOrder.estimateFinishDate
            }</p>
            <p><strong>Finish Date:</strong> ${
              warrantyOrder.finishDate || "N/A"
            }</p>
            <p><strong>Created At:</strong> ${formatDate(
              warrantyOrder.createdAt.split("T")[0]
            )}</p>
            <p><strong>Staff ID:</strong> ${warrantyOrder.staffId}</p>
            <p><strong>Warranty ID:</strong> ${warrantyOrder.warrantyId}</p>
         
        </div>
        <div class="footer">
          <div class="sign">
            <div>
              <div>Customer</div>
              <div>(Signature and full name)</div>
            </div>
            <div>
              Date ...... Month ...... Year 20......<br>
              Staff<br>
            </div>
          </div>
        </div>
      </body>
      </html>
        `);
    printWindow.document.close();
    printWindow.print();
  }
}

export default printWarrantyOrder;
