export function delimitString({
  phrase,
  max,
}: {
  phrase: string;
  max: number;
}) {
  const substring = phrase.substring(0, max);
  if (phrase.length < max) return phrase;
  else return substring + "...";
}
