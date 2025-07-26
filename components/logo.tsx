import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-block mb-3">
      <div className="special-gothic-expanded-one-regular text-5xl font-normal text-white hidden md:block">
        NXT
      </div>
      <div className="special-gothic-expanded-one-regular text-5xl font-normal text-white hidden md:block">
        RS
      </div>
      <div className="special-gothic-expanded-one-regular text-2xl font-normal text-white md:hidden">
        NXT.RS
      </div>
    </Link>
  );
}
