import React, { useState } from 'react'
import InvoiceTable from '../../components/invoicePage/InvoiceTable'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material'
import CreateInvoicePopup from '../../components/invoicePage/CreateInvoicePopup';

export default function InvoicePage() {
  const [isCreateInvoicePopupOpen, setIsCreateInvoicePopupOpen] = useState<boolean>(false);
  return (
    <div className='bg-white w-full h-screen py-6 px-7'>
        <div className="header buttons flex flex-row items-center bg-white mb-4">
            <div className="search-bar w-[20%] px-1 mr-4 flex flex-row items-center border border-slate-400 rounded-xl overflow-hidden">
                <input
                    type="text"
                    placeholder="Search invoice"
                    className="w-full py-2 px-[3px] rounded-md"
                    style={{ border: '0', outline: 'none' }}
                    onChange={(e) => {
                    }}
                    id="searchProductInput"
                >
                </input>
                <SearchIcon className='hover:bg-slate-50 rounded-full p-1' sx={ { width: 35, height: 35} }/>
            </div>
            <Button
            variant="contained"
            color="primary"
            style={{
                textTransform: "none",
            }}
            id="addProductButton"
            onClick={() => setIsCreateInvoicePopupOpen(true)}
            >
            Add Invoice
            </Button>
        </div>
        <InvoiceTable/>
        { isCreateInvoicePopupOpen && <CreateInvoicePopup onClose={() => setIsCreateInvoicePopupOpen(false)}/>}
    </div>
  )
}
