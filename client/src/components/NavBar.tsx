import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import audit from "../assets/audit.svg";
import inventory from "../assets/inventory.svg";
import product from "../assets/product.svg";
import provider from "../assets/provider.svg";
import catalogue from "../assets/catalogue.svg";
import setting from "../assets/setting.svg";
import help from "../assets/help.svg";
import logout from "../assets/logout.svg";

export default function NavBar() {
  return (
    <nav className="navbar bg-white h-full shadow-md w-[280px]">
      <a href="#" className="w-full flex flex-row items-center p-[16px]">
        <img src={Logo} className="w-[48px] h-[48px] mr-3" alt="" />
        <span className="font-bold text-xl">Nội thất đẹp</span>
      </a>
      <ul className="navbar-menu flex flex-col justify-center gap-[2px] py-2 px-[24px] mb-4">
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row  items-center " to="/">
            <img className="w-[20px] h-[20px] mr-3" src={product} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Product
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/inventory">
            <img className="w-[24px] h-[24px] mr-3" src={inventory} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Inventory
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/category">
            <img className="w-[20px] h-[20px] mr-3" src={catalogue} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Category
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/invoice">
            <img className="w-[22px] h-[22px] mr-3" src={audit} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Invoice
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/provider">
            <img className="w-[22px] h-[22px] mr-3" src={provider} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Provider
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/customer">
            <img className="w-[22px] h-[22px] mr-3" src={provider} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Customer
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/">
            <img className="w-[22px] h-[22px] mr-3" src={provider} alt="" />
            <span className="text-base font-medium text-[#5D6679]">Staff</span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/promotion">
            <img className="w-[22px] h-[22px] mr-3" src={audit} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Promotion
            </span>
          </Link>
        </li>
        {/* warranty */}
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/warranty">
            <img className="w-[22px] h-[22px] mr-3" src={audit} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Warranty
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/">
            <img className="w-[22px] h-[22px] mr-3" src={audit} alt="" />
            <span className="text-base font-medium text-[#5D6679]">Report</span>
          </Link>
        </li>
      </ul>
      <ul className="navbar-menu flex flex-col justify-center gap-[2px] py-2 px-[24px]">
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center " to="/">
            <img className="w-[24px] h-[24px] mr-3" src={setting} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Setting
            </span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1" to="/">
            <img className="w-[24px] h-[24px] mr-3" src={help} alt="" />
            <span className="text-base font-medium text-[#5D6679]">Help</span>
          </Link>
        </li>
        <li className="navbar-menu-item py-2 px-2 hover:bg-[#F5F6F8]">
          <Link className="flex flex-row items-center py-1 px-[3px]" to="/">
            <img className="w-[21px] h-[21px] mr-3" src={logout} alt="" />
            <span className="text-base font-medium text-[#5D6679]">
              Log out
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
