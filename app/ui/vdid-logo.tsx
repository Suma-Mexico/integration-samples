import Image from "next/image";

export default function VdidLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Image
        src="/SUMA_logo_blue.png"
        alt="ACS logo"
        width={500}
        height={500}
      />
    </div>
  );
}
