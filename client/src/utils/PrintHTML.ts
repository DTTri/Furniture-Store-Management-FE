function printHTML(className: string, data: any[]) {
    const printContents = document.getElementsByClassName(className);
    const printWindow = window.open("", "", "height=600,width=800");
  
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print</title>");
      printWindow.document.write("</head><body>");
  
      Array.from(printContents).forEach((element) => {
        printWindow.document.write(element.innerHTML);
      });
  
      if (data.length > 0) {
        printWindow.document.write("<table border='1' style='width: 100%; border-collapse: collapse;'>");
        printWindow.document.write("<thead><tr>");
  
        Object.keys(data[0]).forEach((key) => {
          printWindow.document.write(`<th style='padding: 8px; text-align: left;'>${key}</th>`);
        });
  
        printWindow.document.write("</tr></thead><tbody>");
  
        data.forEach((row) => {
          printWindow.document.write("<tr>");
          Object.values(row).forEach((value) => {
            printWindow.document.write(`<td style='padding: 8px;'>${value}</td>`);
          });
          printWindow.document.write("</tr>");
        });
  
        printWindow.document.write("</tbody></table>");
      }
  
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  }
  
  export default printHTML;