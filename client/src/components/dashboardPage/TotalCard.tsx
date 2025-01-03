import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import formatMoney from "../../utils/formatMoney";

export default function TotalCard({
  totalCost,
  unit,
  isIncrease,
  title,
}: {
  totalCost: number;
  unit: string;
  isIncrease: boolean;
  title: string;
}) {
  return (
    <div className="w-[280px]  h-[120px] rounded-[10px] shadow-lg overflow-hidden">
      <div className="flex flex-col bg-[#ffffff] p-2 gap-1 mx-auto">
        <div className="flex flex-row items-center">
          <p className="text-[20px] text-[#343434] font-semibold mr-2">
            {title}
          </p>
          {isIncrease ? (
            <div className=" rounded-3xl flex flex-row items-center px-1 py-[2px]">
              <TrendingUpIcon
                sx={{ width: 16, height: 14 }}
                className="text-[#0B8A00]"
              />
              <p className="text-[#0B8A00]">+2.5%</p>
            </div>
          ) : (
            <div className="rounded-3xl flex flex-row items-center gap-[2px] px-1 py-[2px]">
              <TrendingDownIcon
                sx={{ width: 16, height: 14 }}
                className="text-[#C71026]"
              />
              <p className="text-[#C71026]">-2.5%</p>
            </div>
          )}
        </div>
        <div className="text-[24px] font-bold text-[#232323]">{unit === 'Dong' ? formatMoney(totalCost.toString()) : totalCost}</div>
        <div className="text-[14px] text-[#949494]">{unit}</div>
      </div>
    </div>
  );
}
