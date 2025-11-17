import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-3 text-sm mb-12">
        
        {/* Logo */}
        <img src="/logo.png" className="h-6 w-auto" alt="logo" />

        {/* Menu Links */}
        <nav className="hidden gap-6 text-slate-600 sm:flex ml-auto mr-12">
          <Link to="/" className="hover:text-orange-500">Dashboard</Link>
          <Link to="/orders" className="hover:text-orange-500" >Orders</Link>
          <Link to="/holdings" className="hover:text-orange-500">Holdings</Link>
          <Link to="/positions" className="hover:text-orange-500">Positions</Link>
          <Link to="/funds" className="hover:text-orange-500">Funds</Link>
          <Link to="/apps" className="hover:text-orange-500">Apps</Link>
        </nav>

        {/* Profile Button (you will add click logic) */}
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-50">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-50 text-xs font-medium text-fuchsia-500">
            ZU
          </div>
          <p className="text-xs font-medium">USERID</p>
        </button>
      </div>
    </header>
  );
};

export default Menu;
