import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 ">
      <Link className="text-white font-bold" href="/">Leilão</Link>
      <Link href="/add"></Link>
    </nav>
  );
}
