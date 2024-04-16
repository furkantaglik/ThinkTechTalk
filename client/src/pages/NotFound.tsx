import Navbar from "@/components/global/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-extrabold">Sayfa Bulunamadı</h1>
      </div>
    </>
  );
}
