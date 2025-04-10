import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="block mb-8">
      <div className="font-tinos text-4xl font-normal text-white">NXT</div>
      <div className="font-tinos text-4xl font-normal text-white">RS</div>
    </Link>
  );
}
