import { useLanguage } from "@/contexts/LanguageContext";

export default function MainPresentation() {
  // Obtenemos el lenguaje actual
  const { language } = useLanguage();

  // Definimos un objeto que mapea el idioma con el texto de presentación
  const presentationByLanguage = {
    "en-US": {
      title: "Welcome to Mishiflix! Watch your favorite movies and TV shows.",
      subtitle: "Please login or sign up to start watching.",
    },
    "es-AR": {
      title: "Bienvenido a Mishiflix! Mira tus películas y series favoritas.",
      subtitle: "Por favor inicia sesión o regístrate para comenzar a ver.",
    },
    "fr-FR": {
      title: "Bienvenue sur Mishiflix! Regardez vos films et séries préférés.",
      subtitle:
        "Veuillez vous connecter ou inscrire pour commencer à regarder.",
    },
  };

  // Mostramos el texto de presentación según el idioma
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h2 className="text-xl text-center">
        {
          presentationByLanguage[
            language as keyof typeof presentationByLanguage
          ].title
        }
      </h2>
      <p className="text-center">
        {
          presentationByLanguage[
            language as keyof typeof presentationByLanguage
          ].subtitle
        }
      </p>
    </div>
  );
}
