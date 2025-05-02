import { useLanguage } from "@/contexts/LanguageContext";
import Select from "./ui/Select";

export default function LanguageSelector() {
  // Obtenemos el lenguaje actual y la función para cambiarlo
  const { language, setLanguage } = useLanguage();

  // Definimos las opciones de idioma
  const options = [
    { id: 1, value: "en-US", label: "English" },
    { id: 2, value: "es-AR", label: "Español" },
    { id: 3, value: "fr-FR", label: "Français" },
  ];

  // Mostramos el selector de idioma
  return (
    <div
      className="relative flex justify-center items-center p-2"
      title="Change Language"
    >
      <Select options={options} value={language} setValue={setLanguage} />
    </div>
  );
}
