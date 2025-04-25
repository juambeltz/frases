import { useEffect, useState } from "react";
import axios from "axios";
import PhraseCard from "./PhraseCard";

export default function PhraseList() {
  const [frases, setFrases] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [autor, setAutor] = useState("");
  const [tema, setTema] = useState("");
  const [pagina, setPagina] = useState(1);
  const frasesPorPagina = 6;

  useEffect(() => {
    axios.get("http://localhost:30077/frases")
      .then(res => {
        setFrases(res.data);
        setFiltered(res.data);
      });
  }, []);

  useEffect(() => {
    const filtradas = frases.filter(f =>
      (autor ? f.autor === autor : true) &&
      (tema ? f.tema === tema : true)
    );
    setFiltered(filtradas);
    setPagina(1);
  }, [autor, tema, frases]);

  const autores = [...new Set(frases.map(f => f.autor))];
  const temas = [...new Set(frases.map(f => f.tema))];

  const totalPaginas = Math.ceil(filtered.length / frasesPorPagina);
  const mostradas = filtered.slice((pagina - 1) * frasesPorPagina, pagina * frasesPorPagina);

  const resetFilters = () => {
    setAutor("");
    setTema("");
    setPagina(1);
    setFiltered(frases);
  };

  return (
    <div className="p-4">
      {/* Filtros y botón */}
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <select onChange={e => setAutor(e.target.value)} value={autor} className="p-2 border rounded">
          <option value="">Todos los autores</option>
          {autores.map((a, i) => <option key={i}>{a}</option>)}
        </select>
        <select onChange={e => setTema(e.target.value)} value={tema} className="p-2 border rounded">
          <option value="">Todos los temas</option>
          {temas.map((t, i) => <option key={i}>{t}</option>)}
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-full bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Eliminar selección
        </button>
      </div>

      {/* Línea con resultados */}
      <div className="mb-6 text-sm text-gray-700 border-b pb-2">
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Lista de frases o mensaje vacío */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No hay frases que coincidan con la selección</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostradas.map(frase => (
            <PhraseCard key={frase.id} frase={frase} />
          ))}
        </div>
      )}

      {/* Navegación de páginas */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={`px-3 py-1 border rounded ${pagina === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
