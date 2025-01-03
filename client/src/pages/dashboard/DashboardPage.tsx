import { useEffect, useState } from "react";
import TotalCard from "../../components/dashboardPage/TotalCard";
import { Tabs, Tab } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import sReport from "../../store/reportStore";
import Report from "../../entities/Report";
import LoadingProgress from "../../components/LoadingProgress";
import reportService from "../../services/report.service";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import StaffReport from "../../entities/StaffReport";
import IncomeReport from "../../entities/IncomeReport";
import { toast } from "react-toastify";
import formatDate from "../../utils/formatDate";
        
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFromDate, setSelectedFromDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0]
  );
  const [selectedToDate, setSelectedToDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const report = sReport.use();
  const [reportData, setReportData] = useState<Report>(report.reportByDate);
  const [reportStaffData, setStaffReportData] = useState<StaffReport[]>(
    report.staffReport
  );
  const [reportIncomeData, setReportIncomeData] = useState<IncomeReport[]>(
    report.incomeReport
  );

  console.log("report by DAte", report);
  console.log("report general data", reportData);
  console.log("report staff data", reportStaffData);
  console.log("report income data", reportIncomeData);

  useEffect(() => {
    if (report.reportByDate && report.staffReport && report.incomeReport) {
      setReportData(report.reportByDate);
      setReportIncomeData(report.incomeReport);
      setStaffReportData(report.staffReport);
    }
  }, [report]);

  useEffect(() => {
    if (new Date(selectedFromDate) >= new Date(selectedToDate)) {
      toast.error("From Date must be before To Date");
      return;
    }
    console.log("selectedFromDate", selectedFromDate);
    console.log("selectedToDate", selectedToDate);
    const fetchIncomeReport = async () => {
      try { 
        const response = await reportService.getReprotByDate(
          selectedFromDate,
          selectedToDate
        );
        if (response.data.EC == 0) {
          setReportData(response.data.DT);
        } else {
          console.log("income report", response.data.EM);
        }
      } catch (error) {
      }
    };
    const fetchStaffReport = async () => {
      try {
        const response = await reportService.getStaffReprotByDate(
          selectedFromDate,
          selectedToDate
        );
        if (response.data.EC == 0) {
          console.log("staff report", response.data.DT);
          setStaffReportData(response.data.DT);
        } else {
          console.log("staff report", response.data.EM);
        }
      } catch (error) {
      }
    };
    Promise.all([fetchIncomeReport(), fetchStaffReport()]);
  }, [selectedFromDate, selectedToDate]);

  if (!reportData || !reportStaffData || !reportIncomeData || !reportData.currentPromotion) {
    return <LoadingProgress />;
  }

  const promotionColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Promotion Name",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        if (row.status === null) return "On Going";
        return row.status;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        if (row.startDate === null) return "";
        return formatDate(row.startDate);
      },
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        if (row.finishDate === null) return "";
        return formatDate(row.finishDate);
      },
    },
    {
      field: "totalQuantitySold",
      headerName: "Total Quantity Sold",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalRevenue",
      headerName: "Total Revenue",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ];
  const promotionRows = [
    {
      ...reportData.currentPromotion,
      id: 1,
    },
  ];
  const staffColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Index",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "staffid",
      headerName: "Staff Id",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "staffname",
      headerName: "Staff Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countinvoice",
      headerName: "Number of Invoice",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumtotal",
      headerName: "Total",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumquantity",
      headerName: "Quantity",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ];
  const staffRows = reportStaffData.map((staff, index) => ({
    id: index + 1,
    ...staff,
  }));
  const incomeColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Index",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productvariantid",
      headerName: "Product Variant Id",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "importprice",
      headerName: "Import Price",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumquantity",
      headerName: "Sum Quantity",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumcost",
      headerName: "Sum Cost",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ];
  const incomeRows = reportIncomeData.map((income, index) => ({
    id: index + 1,
    ...income,
  }));
  const paymentRows = [
    {
      id: 1,
      label: "Cash",
      value: reportData.paymentMethodStatistic.Cash
    },
    {
      label: "QR",
      id: 2,
      value: reportData.paymentMethodStatistic.qr
    },
  ];

  // const years = Array.from(
  //   { length: new Date().getFullYear() - 1999 },
  //   (_, i) => 2000 + i
  // );
  // const months = new Map([
  //   ["January", 1],
  //   ["February", 2],
  //   ["March", 3],
  //   ["April", 4],
  //   ["May", 5],
  //   ["June", 6],
  //   ["July", 7],
  //   ["August", 8],
  //   ["September", 9],
  //   ["October", 10],
  //   ["November", 11],
  //   ["December", 12],
  // ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          <Tab label="General" />
          <Tab label="Income" />
          <Tab label="Staff" />
        </Tabs>
      </div>
      <div className="w-full flex justify-end space-x-2">
        <div className=" flex-row items-center border-r-2 pr-2">
          <span className="text-base font-medium mr-2">From: </span>
          <input
            type="date"
            value={selectedFromDate}
            onChange={(e) => setSelectedFromDate(e.target.value)}
          />
        </div>
        <div className=" flex-row items-center">
          <span className="text-base font-medium mr-2">To: </span>
          <input
            type="date"
            form="DD/MM/yyyy"
            value={selectedToDate}
            onChange={(e) => setSelectedToDate(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 0 && (
        <div className="flex flex-col gap-2">
          <div className="w-full grid grid-cols-4 gap-2 mb-2">
            <TotalCard
              isIncrease={true}
              title="Total Sold Product"
              totalCost={reportData.totalSoldProduct}
              unit="USD"
            />
            <TotalCard
              isIncrease={true}
              title="Total Revenue"
              totalCost={reportData.totalRevenue}
              unit="USD"
            />
            <TotalCard
              isIncrease={true}
              title="Total Expense"
              totalCost={reportData.totalExpense}
              unit="People"
            />
          </div>
          <div className="charts w-full flex flex-row gap-3">
            <div className="h-[350px] bg-[#fff] shadow-lg w-[40%] p-2">
              <p className="text-lg font-semibold text-black mb-3">
                Order Payment Method
              </p>
              <PieChart
                series={[
                  {
                    data: paymentRows,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    valueFormatter: (value) =>
                      `${value.label} - ${value.value} USD`,
                  },
                ]}
                height={230}
                width={400}
              />
            </div>
            <div className=" bg-[#fff] shadow-lg w-[58%] p-2">
              <p className="text-lg font-semibold text-black">
                Ongoing Promotion
              </p>
              <DataGrid
                style={{
                  border: "none",
                  backgroundColor: "white",
                  minHeight: "300px",
                  height: "fit-content",
                }}
                columns={promotionColumns}
                rows={promotionRows}
                rowHeight={40}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 3,
                    },
                  },
                }}
                slots={{ toolbar: GridToolbar }}
                rowSelection={false}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="p-2">
          {/* <BarChart
            dataset={data}
            yAxis={[
              {
                label: "USD",
              },
            ]}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-20px, 0)",
              },
            }}
            width={700}
            height={500}
            series={[
              { dataKey: "uv", label: "UV" },
              { dataKey: "pv", label: "PV" },
            ]}
            xAxis={[{ scaleType: "band", dataKey: "name" }]}
          ></BarChart> */}
          <p className="text-3xl font-bold text-black mb-2">Income Report</p>
          <div className="p-2">
            <DataGrid
              style={{
                border: "none",
                backgroundColor: "white",
                minHeight: "300px",
                height: "fit-content",
              }}
              columns={incomeColumns}
              rows={incomeRows}
              rowHeight={40}
              pageSizeOptions={
                incomeRows.length < 8
                  ? [8, incomeRows.length]
                  : [8, incomeRows.length + 1]
              }
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              rowSelection={false}
            />
            <p className="font-bold text-[20px] text-end mt-2 text-[#C71026]">
              Total Cost:{" "}
              {incomeRows.reduce(
                (acc, row) => acc + parseFloat(row.sumcost.toString()),
                0
              )}{" "}
              USD
            </p>
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className="p-2">
          <p className="text-3xl font-bold text-black mb-2">Staff Report</p>
          <DataGrid
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "white",
              minHeight: "300px",
              height: "fit-content",
            }}
            columns={staffColumns}
            rows={staffRows}
            rowHeight={40}
            pageSizeOptions={
              staffRows.length < 8
                ? [8, staffRows.length]
                : [8, staffRows.length + 1]
            }
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </div>
      )}
    </div>
  );
}
