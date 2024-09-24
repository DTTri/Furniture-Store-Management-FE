import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar bg-white shadow-md">
      <div className="brand-name text-xl font-semibold p-4">Nội thất</div>
      <ul className="navbar-menu flex flex-col gap-4 p-4">
        <li className="navbar-menu-item">
          <Link to="/">Sản phẩm</Link>
        </li>
        <li className="navbar-menu-item">
          <Link to="/inventory">Kho</Link>
        </li>
      </ul>
    </nav>
  );
}
