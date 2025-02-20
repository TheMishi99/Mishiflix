import Link from "next/link";

export default function PageButtons({
  children,
  actualPage,
  totalPages,
  baseUrl,
}: {
  children: React.ReactNode;
  actualPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  const nextPage = actualPage + 1;
  const prevPage = actualPage - 1;
  const buttons = (
    <div className="flex justify-center items-center p-2 gap-2">
      {prevPage >= 1 ? (
        <Link
          href={baseUrl + `page=${prevPage}`}
          className="p-2 rounded-xl bg-red-600"
        >
          {"<-"}
        </Link>
      ) : (
        <p className="p-2 rounded-xl bg-red-800">{"<-"}</p>
      )}
      <Link
        href={baseUrl + `page=${actualPage}`}
        className="p-2 rounded-xl bg-red-600"
      >
        {actualPage}
      </Link>
      {nextPage <= totalPages ? (
        <Link
          href={baseUrl + `page=${nextPage}`}
          className="p-2 rounded-xl bg-red-600"
        >
          {"->"}
        </Link>
      ) : (
        <p className="p-2 rounded-xl bg-red-800">{"->"}</p>
      )}
    </div>
  );
  return (
    <>
      {buttons}
      {children}
      {buttons}
    </>
  );
}
