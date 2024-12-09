import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Staff } from "../../entities";
import staffService from "../../services/staff.service";
import StaffsTable from "../../components/staffPage/StaffsTable";
import AddStaffPopup from "../../components/staffPage/AddStaffPopup";
import { sStaff } from "../../store";

export default function StaffPage() {
  const staffs = sStaff.use((v) => v.staffs);

  const handleDeleteStaff = async () => {
    try {
      const res = await staffService.deleteStaff(selectedStaff.id);
      if (res.data.EC === 0) {
        sStaff.set((v) =>
          v.value.staffs.filter((p) => {
            if (p.id === selectedStaff.id) {
              p.Account.status = "inactive";
            }
            return p;
          })
        );
        console.log("Successfully deleted staff");
      } else {
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };
  const [isAddStaffPopupOpen, setIsAddStaffPopupOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff>(staffs[0]);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  return (
    <div className="bg-white w-full">
      <div className="header w-full flex gap-4 p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddStaffPopupOpen(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="addStaffButton"
        >
          Add Staff
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <StaffsTable
          staffs={staffs}
          onEditStaff={(staff) => {
            setIsAddStaffPopupOpen(true);
            setSelectedStaff(staff);
            setIsForUpdate(true);
          }}
          onDeleteStaff={(staff) => {
            setSelectedStaff(staff);
            setIsConfirmDeletePopupOpen(true);
          }}
        />
      </div>
      {isAddStaffPopupOpen && (
        <AddStaffPopup
          onClose={() => {
            setIsAddStaffPopupOpen(false);
            setIsForUpdate(false);
          }}
          onStaffCreated={(staff) =>
            sStaff.set((v) => {
              v.value.staffs = [...v.value.staffs, staff];
            })
          }
          staff={isForUpdate ? selectedStaff : undefined}
          onStaffUpdated={(staff) =>
            sStaff.set((v) => {
              v.value.staffs = v.value.staffs.map((s) =>
                s.id === staff.id ? staff : s
              );
            })
          }
        />
      )}
      {isConfirmDeletePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2>
              Are you sure you want to delete repair order{" "}
              {selectedStaff.fullname}?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsConfirmDeletePopupOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeleteStaff();
                  setIsConfirmDeletePopupOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
