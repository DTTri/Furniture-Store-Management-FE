import NavBar from "../../components/NavBar";
import { bills } from "../../data/test";
export default function BillPage() {
  return (
    <div className="bg-gray-100 w-full h-screen max-h-screen flex gap-4 p-8">
      <NavBar />
      <div className="container">
        <div className="header w-full bg-white flex gap-4 p-4">
          <div className="search-bar w-2/5">
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
        </div>
        <div className="body w-full bg-white rounded-lg p-4">
          <table className="w-full">
            <thead>
              <td className="text-center">STT</td>
              <td className="text-center">Ngày tạo</td>
              <td className="text-center">Mã hóa đơn</td>
              <td className="text-center">Mã khách hàng</td>
              <td className="text-center">Mã nhân viên</td>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr className="border-t h-8" key={bill.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{bill.date}</td>
                  <td className="text-center">{bill.id}</td>
                  <td className="text-center">{bill.customerId}</td>
                  <td className="text-center">{bill.staffId}</td>
                  <td className="text-center">
                    <button className="w-6 h-6 border-2">i</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
