import React, { useEffect, useState } from "react";
import TotalCard from "../../components/dashboardPage/TotalCard";
import { Tabs, Tab } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts";
import sReport from "../../store/reportStore";
import Report from "../../entities/Report";
import LoadingProgress from "../../components/LoadingProgress";
import reportService from "../../services/report.service";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import StaffReport from "../../entities/StaffReport";
import IncomeReport from "../../entities/IncomeReport";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const report = sReport.use();
  const [reportData, setReportData] = useState<Report>(report.reportByDate);
  const [reportStaffData, setStaffReportData] = useState<StaffReport>(report.staffReport);
  const [reportIncomeData, setReportIncomeData] = useState<IncomeReport>(report.incomeReport);

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

  const handleOnDateChange = async () => {
    const startDate =
      selectedYear === new Date().getFullYear()
        ? new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0]
        : new Date(selectedYear, 0, 1).toISOString().split("T")[0];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
    let endDate;
    if (selectedYear < currentYear) {
      endDate = new Date(selectedYear, selectedMonth, 0)
        .toISOString()
        .split("T")[0];
    } else if (selectedYear === currentYear) {
      if (selectedMonth < currentMonth) {
        endDate = new Date(selectedYear, selectedMonth, 0)
          .toISOString()
          .split("T")[0];
      } else if (selectedMonth === currentMonth) {
        endDate = today.toISOString().split("T")[0];
      } else {
        endDate = new Date(selectedYear, selectedMonth, 0)
          .toISOString()
          .split("T")[0];
      }
    } else {
      endDate = new Date(selectedYear, selectedMonth, 0)
        .toISOString()
        .split("T")[0];
    }
    console.log("Date", startDate, endDate);
    const fetchGeneralReportByDate = async () => {
      try {
        const res = await reportService.getReprotByDate(startDate, endDate);
        if(res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set(prev => prev.value.reportByDate = res.data.DT);
        }
        else {
          console.error("Failed to fetch report by date:", res.data.EM);
        }
      } catch (error) { 
        console.error("Error fetching report by date:", error);
      }      
    }
    const fetchStaffReportByDate = async () => {
      try {
        const res = await reportService.getStaffReprotByDate(startDate, endDate);
        if(res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set(prev => prev.value.staffReport = res.data.DT);
        }
        else {
          console.error("Failed to fetch staff report by date:", res.data.EM);
        }
      } catch (error) { 
        console.error("Error fetching staff report by date:", error);
      }      
    }
    const fetchIncomeReportByDate = async () => {
      try {
        const res = await reportService.getIncomeReprotByDate(startDate, endDate);
        if(res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set(prev => prev.value.incomeReport = res.data.DT);
        }
        else {
          console.error("Failed to fetch income report by date:", res.data.EM);
        }
      } catch (error) { 
        console.error("Error fetching income report by date:", error);
      }      
    }
    Promise.all([fetchGeneralReportByDate(), fetchStaffReportByDate(), fetchIncomeReportByDate()]);
  };

  if (!reportData || !reportStaffData || !reportIncomeData) {
    return <LoadingProgress />;
  }

  const promotionColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Promotion Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
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
  const promotionRows = [{
    ...reportData.currentPromotion,
    id: 1,
  }]
  const staffColumns: GridColDef[] = [
    {
      field: "staffId",
      headerName: "Id",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "staffName",
      headerName: "Staff Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countInvoice",
      headerName: "Number of Invoice",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumTotal",
      headerName: "Total",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumQuantity",
      headerName: "Quantity",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ];
  const staffRows = [{
    id: reportStaffData.staffId,
    ...reportStaffData,
  }]
  const incomeColumns: GridColDef[] = [
    {
      field: "productVariantId",
      headerName: "Id",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "SKU",
      headerName: "SKU",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "importPrice",
      headerName: "Import Price",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumQuantity",
      headerName: "Sum Quantity",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sumCost",
      headerName: "Sum Cost",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ];
  const incomeRows = [{
    id: reportIncomeData.productVariantId,
    ...reportIncomeData,
  }]
  const paymentRows = [
    {
      id: 1,
      label: "Cash",
      value: 10, //reportData.paymentMethodStatistic.cash 
    },
    {
      label: "QR",
      id: 2,
      value:  10, //reportData.paymentMethodStatistic.qr
    },
  ]
  const data = [
    { name: "January", uv: 4000, pv: 2400, amt: 2400 },
    { name: "February", uv: 3000, pv: 1398, amt: 2210 },
    { name: "March", uv: 2000, pv: 9800, amt: 2290 },
    { name: "April", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "June", uv: 2390, pv: 3800, amt: 2500 },
    { name: "July", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => 2000 + i
  );
  const months = new Map([
    ["January", 1],
    ["February", 2],
    ["March", 3],
    ["April", 4],
    ["May", 5],
    ["June", 6],
    ["July", 7],
    ["August", 8],
    ["September", 9],
    ["October", 10],
    ["November", 11],
    ["December", 12],
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label="General" />
          <Tab label="Revenue" />
          <Tab label="Ongoing Promotion" />
          <Tab label="Staff" />
        </Tabs>
      </div>

      {activeTab === 0 && (
        <div className="flex flex-col gap-2">
              <div className="w-full flex justify-end space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(Number(e.target.value));
                handleOnDateChange();
              }}
            >
              {Array.from(months.entries()).map(([monthName, monthValue]) => (
                <option key={monthValue} value={monthValue}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
                handleOnDateChange();
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
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
          <div className="charts w-full">
            <div className="h-[350px] bg-[#fff] shadow-lg w-[500px] p-2">
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
                    valueFormatter: (v: any) => `${v.label} - ${v.value} USD`,
                  },
                ]}
                height={230}
                width={400}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="p-5">
          <BarChart
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
          ></BarChart>
          <div className="p-5">
          <DataGrid
            style={{
              borderRadius: "10px",
              backgroundColor: "white",
              minHeight: "300px",
              height: "fit-content",
            }}
            columns={incomeColumns}
            rows={incomeRows}
            rowHeight={40}
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
        </div>
      )}
      {activeTab === 2 && (
        <div className="p-5">
          <DataGrid
            style={{
              borderRadius: "10px",
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
                  pageSize: 8,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </div>
      )}
      {activeTab === 3 && (
        <div className="p-5">
          <DataGrid
            style={{
              borderRadius: "10px",
              backgroundColor: "white",
              minHeight: "300px",
              height: "fit-content",
            }}
            columns={staffColumns}
            rows={staffRows}
            rowHeight={40}
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
