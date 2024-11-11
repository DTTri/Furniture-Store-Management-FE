import { ProviderStatus } from "../constants";

type Provider = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  president: string;
  status: ProviderStatus;
};
export default Provider;
