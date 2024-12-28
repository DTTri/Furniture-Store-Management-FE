import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

export default function ConfirmPopup({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-[#fff] max-w-[400px] w-full p-4 overflow-hidden rounded-lg ">
        <div className="w-full flex flex-row items-center justify-between pb-2 mb-2 border-b-[1px] border-b-slate-800">
          <h3 className="text-center text-2xl font-bold">{title}</h3>
          <CloseIcon
            className="cursor-pointer hover:bg-slate-100rounded-full"
            sx={{ width: 25, height: 25 }}
            onClick={onCancel}
          />
        </div>
        <div className="text-center text-lg font-normal my-3">{message}</div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            variant="contained"
            color="error"
            className="bg-red-500 text-white px-5 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="info"
            className="bg-blue-500 text-white px-5 py-2 "
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
