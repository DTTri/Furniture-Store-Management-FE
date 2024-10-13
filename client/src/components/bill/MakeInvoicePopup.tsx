export default function MakeInvoicePopup() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white flex justify-around relative rounded-xl p-4 py-10 w-1/2 max-h-[80vh] min-h-[20vh] overflow-hidden">
        <button className="absolute top-2 right-2 w-6 h-6 text-base bg-black text-white rounded-full">
          x
        </button>
      </div>
    </div>
  );
}
