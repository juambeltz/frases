import { Link, useNavigate } from "react-router-dom";

export default function Header({ resetFilters }) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    resetFilters();  // Reseteamos los filtros al hacer clic en Home
    navigate("/");  // Navegamos a la página principal
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">
      <Link to="/" onClick={handleHomeClick} className="hover:underline">
          Frases
        </Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/" onClick={handleHomeClick} className="hover:underline">
          Home
        </Link>
        <Link to="/contacto" className="hover:underline">Contacto</Link>
      </nav>
    </header>
  );
}



// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
//       <h1 className="text-xl font-bold">
//         <Link to="/">Frases</Link>
//       </h1>
//       <nav className="space-x-4">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/contacto" className="hover:underline">Contacto</Link>
//       </nav>
//     </header>
//   );
// }
