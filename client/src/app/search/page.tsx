import { Search, SearchResults } from "@/components";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    speciality?: string;
    place?: string;
  };
}) {
  const query = searchParams?.q || '';
  const speciality = searchParams?.speciality || ''
  const place = searchParams?.place || ''
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col p-4">
      <Search placeholder="Buscar Medicos..." />
      <Suspense key={query} fallback={'Cargando ...'}>
        <SearchResults query={query} speciality={speciality} place={place} />
      </Suspense>
    </div>
  )
}