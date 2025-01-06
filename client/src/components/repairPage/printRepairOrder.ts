import { RepairOrder } from "../../entities";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
function printRepairOrder(repairOrder: RepairOrder) {
  const printWindow = window.open("", "", "height=800,width=600");
  if (printWindow) {
    printWindow.document.write(`
          <html>
        <head>
          <title>Repair Order</title>
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
            <div class="company-name">FURNITURE KING</div>
            <div class="details">
              Address: Thu Duc district, Ho Chi Minh city<br>
              Phone: 0(028) 372 52002<br>
              * Mobile: 0128.258.603<br>
            </div>
            <div class="title">
            Repair Order
            </div>
            <div class="sub-title">
              RETAIL FURNITURE STORE 
            </div>
          </div>
          <div class="warranty-order-content">
              <p><strong>Product:</strong> ${repairOrder.productName}</p>
              <p><strong>Description:</strong> ${repairOrder.description}</p>
              <p><strong>Details:</strong> ${repairOrder.details}</p>
              <p><strong>Cost:</strong> ${formatMoney(repairOrder.cost)}</p>
              <p><strong>Status:</strong> ${repairOrder.status}</p>
              <p><strong>Estimate Finish Date:</strong> ${
                repairOrder.estimateFinishDate
              }</p>
              <p><strong>Finish Date:</strong> ${
                repairOrder.finishDate || "N/A"
              }</p>
              <p><strong>Created At:</strong> ${formatDate(
                repairOrder.createdAt.split("T")[0]
              )}</p>
              <p><strong>Staff ID:</strong> ${repairOrder.staffId}</p>
           
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

export default printRepairOrder;
