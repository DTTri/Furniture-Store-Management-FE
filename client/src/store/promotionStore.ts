import { signify } from "react-signify";
import Promotion from "../entities/Promotion";

const sPromotion = signify({
  promotions: [] as Promotion[],
});
export default sPromotion;
