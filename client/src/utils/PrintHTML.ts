function printHTML(className: string, data: any[]) {
  const printContents = document.getElementsByClassName(className);
  const printWindow = window.open("", "", "height=800,width=600");

  if (printWindow) {
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .invoice-header {
            text-align: center;
            color: red;
            margin-bottom: 10px;
          }
          .invoice-header .company-name {
            font-size: 18px;
            font-weight: bold;
          }
          .invoice-header .details {
            font-size: 12px;
          }
          .invoice-header .title {
            font-size: 20px;
            margin-top: 10px;
          }
          .invoice-content {
            margin: 20px 0;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
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
        <div class="invoice-header">
          <div class="company-name">FURNITURE KING</div>
          <div class="details">
            Address: Thu Duc district, Ho Chi Minh city<br>
            Phone: 0(028) 372 52002<br>
            * Mobile: 0128.258.603<br>
          </div>
          <div class="title">
            INVOICE ORDER
          </div>
          <div class="sub-title">
            RETAIL FURNITURE STORE 
          </div>
        </div>
        <div class="invoice-content">
          <div>
            <strong>Full name:</strong> .................................................<br>
            <strong>Address:</strong> ..........................................................
          </div>
          ${Array.from(printContents)
            .map((element) => `<div>${element.innerHTML}</div>`)
            .join("")}
          <table>
            <thead>
              <tr>
                <th>No.</th>
                ${Object.keys(data[0] || {}).map((key) => `<th>${key}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    ${Object.values(row)
                      .map((value) => `<td>${value}</td>`)
                      .join("")}
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="footer">
          <p><strong>Total items:</strong> .....................................................</p>
          <p><strong>In words:</strong> ...........................................................</p>
          <div class="sign">
            <div>
              <div>Buyer</div>
              <div>(Signature and full name)</div>
            </div>
            <div>
              Date ...... Month ...... Year 20......<br>
              Invoice writer<br>
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

export default printHTML;
