export default function PhraseCard({ frase }) {
    return (
      <div className="border rounded p-4 shadow bg-white">
        <p className="italic mb-2">“{frase.texto}”</p>
        <p className="text-right font-semibold">— {frase.autor}</p>
        <p className="text-right text-sm text-gray-500">Tema: {frase.tema}</p>
      </div>
    );
  }
  