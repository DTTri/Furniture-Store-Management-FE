import React, { useState } from "react";
import CategoryTable from "../../components/categoryPage/CategoryTable";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import DetailCategory from "../../components/categoryPage/CategoryDetailPopup";
import Category from "../../entities/Category";
import CreateCategoryPopup from "../../components/categoryPage/CreateCategoryPopup";

export default function CategoryPage() {
  const [isCreateCategoryPopupOpen, setIsCreateCategoryPopupOpen] =
    useState(false);
  return (
    <div className="bg-white w-full h-screen py-6 px-7">
      <div className="header buttons flex flex-row justify-between items-center bg-white mb-4">
        <div className="search-bar w-[30%] px-1 mr-4 flex flex-row items-center border border-slate-400 rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search Category"
            className="w-full py-2 px-[3px] rounded-md"
            style={{ border: "0", outline: "none" }}
            onChange={(e) => {}}
            id="searchProductInput"
          ></input>
          <SearchIcon
            className="hover:bg-slate-50 rounded-full p-1"
            sx={{ width: 35, height: 35 }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
          onClick={() => {
            setIsCreateCategoryPopupOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>
      <CategoryTable />
      {isCreateCategoryPopupOpen && (
        <CreateCategoryPopup
          onClose={() => {
            setIsCreateCategoryPopupOpen(false);
          }}
        />
      )}
    </div>
  );
}
