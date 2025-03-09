const buttonLabelByLanguage = {
  "en-US": "Add to favorites",
  "es-AR": "Añadir a favoritos",
  "fr-FR": "Ajouter aux favoris",
};
export default function AddToFavoriteButton({
  onClick,
  language,
  included,
}: {
  onClick: () => void;
  included: boolean;
  language: string;
}) {
  return (
    <button
      className="flex justify-center items-center p-2 gap-2"
      onClick={onClick}
    >
      <div className="size-14 rounded-full flex justify-center items-center p-2 gap-2 bg-zinc-800">
        {included ? (
          <span className="text-red-600 text-4xl">❤</span>
        ) : (
          <span className="text-white text-4xl">❤</span>
        )}
      </div>
      <span className="">
        {buttonLabelByLanguage[language as keyof typeof buttonLabelByLanguage]}
      </span>
    </button>
  );
}
