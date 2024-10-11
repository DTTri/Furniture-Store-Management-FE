import GoodsReceiptStatus from "../constants/enums/GoodReceiptStatus";
import GoodsReceipt from "../entities/GoodsReceipt";

const testGoodReceipt: GoodsReceipt[] = [
    {
        id: "GR001",
        receiptDate: "2023-01-15",
        status: GoodsReceiptStatus.PENDING,
        totalCost: 1500.00,
        shippingCost: 50.00,
        staffId: "S001",
        providerId: "P001",
    },
    {
        id: "GR002",
        receiptDate: "2023-02-20",
        status: GoodsReceiptStatus.ACCEPTED,
        totalCost: 2000.00,
        shippingCost: 75.00,
        staffId: "S002",
        providerId: "P002",
    },
    {
        id: "GR003",
        receiptDate: "2023-03-10",
        status: GoodsReceiptStatus.REJECTED,
        totalCost: 500.00,
        shippingCost: 25.00,
        staffId: "S003",
        providerId: "P003",
    },
    {
        id: "GR004",
        receiptDate: "2023-04-05",
        status: GoodsReceiptStatus.PENDING,
        totalCost: 3000.00,
        shippingCost: 100.00,
        staffId: "S004",
        providerId: "P004",
    },
    {
        id: "GR005",
        receiptDate: "2023-05-18",
        status: GoodsReceiptStatus.ACCEPTED,
        totalCost: 2500.00,
        shippingCost: 80.00,
        staffId: "S005",
        providerId: "P005",
    },
];

export default testGoodReceipt;