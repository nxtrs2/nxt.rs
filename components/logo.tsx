import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="block mb-3">
      <div className="special-gothic-expanded-one-regular text-5xl font-normal text-white">
        NXT
      </div>
      <div className="special-gothic-expanded-one-regular text-5xl font-normal text-white">
        RS
      </div>
    </Link>
  );
}
