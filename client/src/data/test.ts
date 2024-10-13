import { ProductStatus } from "../constants";
import { ProductVaraint } from "../entities";
import Product from "../entities/Product";

const products: Product[] = [
  // id: string;
  // name: string;
  // category: string;
  // price: string;
  // status: ProductStatus;
  // image: string;
  // description: string;
  // warranty: number;
  // available: number;
  // quantity: number;
  // defective: number;
  // sold: number;
  // catelogueId: string;
  {
    id: "1",
    name: "Ghế Sofa",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế sofa cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "1",
  },
  // generate 11 more products
  {
    id: "2",
    name: "Bàn trà",
    category: "Nội thất",
    price: "1000000 - 1200000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Bàn trà cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "2",
  },
  {
    id: "3",
    name: "Tủ quần áo",
    category: "Nội thất",
    price: "1500000 - 1700000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Tủ quần áo cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "3",
  },
  {
    id: "4",
    name: "Ghế ăn",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế ăn cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "4",
  },
  {
    id: "5",
    name: "Ghế sofa",
    category: "Nội thất",
    price: "1000000 - 1200000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế sofa cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "5",
  },
  {
    id: "6",
    name: "Bàn trà",
    category: "Nội thất",
    price: "1500000 - 1700000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Bàn trà cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "6",
  },
  {
    id: "7",
    name: "Tủ quần áo",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Tủ quần áo cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "7",
  },
  {
    id: "8",
    name: "Ghế ăn",
    category: "Nội thất",
    price: "1000000 - 1200000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế ăn cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "8",
  },
  {
    id: "9",
    name: "Ghế sofa",
    category: "Nội thất",
    price: "1500000 - 1700000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế sofa cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "9",
  },
  {
    id: "10",
    name: "Bàn trà",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Bàn trà cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "10",
  },
  {
    id: "11",
    name: "Tủ quần áo",
    category: "Nội thất",
    price: "1000000 - 1200000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Tủ quần áo cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "11",
  },
  {
    id: "12",
    name: "Ghế ăn",
    category: "Nội thất",
    price: "1500000 - 1700000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế ăn cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "12",
  },
  // generate 6 more products
  {
    id: "13",
    name: "Ghế sofa",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế sofa cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "13",
  },
  // generate 5 more products by one tab
  {
    id: "14",
    name: "Bàn trà",
    category: "Nội thất",
    price: "1000000 - 1200000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Bàn trà cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "14",
  },
  {
    id: "15",
    name: "Tủ quần áo",
    category: "Nội thất",
    price: "1500000 - 1700000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Tủ quần áo cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "15",
  },
  {
    id: "16",
    name: "Ghế ăn",
    category: "Nội thất",
    price: "500000 - 600000",
    status: ProductStatus.INSTOCK,
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    description: "Ghế ăn cao cấp",
    warranty: 12,
    available: 10,
    quantity: 12,
    defective: 2,
    sold: 0,
    catelogueId: "16",
  },
];

const productVariants: ProductVaraint[] = [
  // id: string;
  // SKU: string;
  // productId: string;
  // price: number;
  // status: ProductStatus;
  // color: string;
  // size: string;
  // image: string;
  // buyingPrice: number;
  {
    id: "1",
    SKU: "1",
    productId: "1",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "2",
    SKU: "2",
    productId: "1",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Trắng",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  {
    id: "3",
    SKU: "3",
    productId: "1",
    price: 1000000,
    status: ProductStatus.INSTOCK,
    color: "Xám",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 800000,
  },
  {
    id: "4",
    SKU: "4",
    productId: "1",
    price: 1200000,
    status: ProductStatus.INSTOCK,
    color: "Nâu",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1000000,
  },
  {
    id: "5",
    SKU: "5",
    productId: "1",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Vàng",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "6",
    SKU: "6",
    productId: "2",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Xanh",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  {
    id: "7",
    SKU: "7",
    productId: "3",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Đỏ",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  }, // more variants
  {
    id: "8",
    SKU: "8",
    productId: "4",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Hồng",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  {
    id: "9",
    SKU: "9",
    productId: "5",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Xám",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "10",
    SKU: "10",
    productId: "5",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  {
    id: "11",
    SKU: "11",
    productId: "6",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Trắng",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "12",
    SKU: "12",
    productId: "6",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  {
    id: "13",
    SKU: "13",
    productId: "7",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Xanh",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "14",
    SKU: "14",
    productId: "7",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Vàng",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  {
    id: "15",
    SKU: "15",
    productId: "8",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Hồng",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "16",
    SKU: "16",
    productId: "8",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Đỏ",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  {
    id: "17",
    SKU: "17",
    productId: "9",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Nâu",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "18",
    SKU: "18",
    productId: "9",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Xám",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  // generate 6 more variants for product has id 18
  {
    id: "19",
    SKU: "19",
    productId: "10",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "20",
    SKU: "20",
    productId: "10",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Trắng",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  {
    id: "21",
    SKU: "21",
    productId: "11",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Xám",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "22",
    SKU: "22",
    productId: "11",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  {
    id: "23",
    SKU: "23",
    productId: "12",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Trắng",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "24",
    SKU: "24",
    productId: "12",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Đen",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
  // generate variants for products dont have variants
  {
    id: "25",
    SKU: "25",
    productId: "13",
    price: 1500000,
    status: ProductStatus.INSTOCK,
    color: "Xám",
    size: "L",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1200000,
  },
  {
    id: "26",
    SKU: "26",
    productId: "14",
    price: 1700000,
    status: ProductStatus.INSTOCK,
    color: "Vàng",
    size: "XL",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 1400000,
  },
  {
    id: "27",
    SKU: "27",
    productId: "15",
    price: 500000,
    status: ProductStatus.INSTOCK,
    color: "Hồng",
    size: "S",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 400000,
  },
  {
    id: "28",
    SKU: "28",
    productId: "16",
    price: 550000,
    status: ProductStatus.INSTOCK,
    color: "Đỏ",
    size: "M",
    image:
      "https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg",
    buyingPrice: 450000,
  },
];

export { products, productVariants };
