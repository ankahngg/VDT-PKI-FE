import Image from "next/image";

export default function Page() {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold">Chào mừng đến với Viettel PKI</div>
      <Image src="/viettel.png" alt="Viettel Logo" width={300} height={100} />
      <div className="text-xl italic">Trạng thái đăng nhập : <span className="font-bold">USER</span></div>
    </div>
  );
}
