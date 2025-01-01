const formatMoney = (amount: string) => {
  // number to Viet Nam Dong
  if (isNaN(Number(amount))) return amount;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(amount.trim()));
};
export default formatMoney;
