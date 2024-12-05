type Staff = {
  id: number;
  fullname: string;
  birth: string;
  gender: string;
  idNumber: string;
  startDate: string;
  phone: string;
  email: string;
  accountId: number;
  updatedAt: string;
  createdAt: string;
  Account: {
    username: string;
    status: string;
    Role: {
      id: number;
      name: string;
    }
  };
};
export default Staff;
