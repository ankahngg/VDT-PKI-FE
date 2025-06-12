import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CSR } from "@/models/CSR";
import { issueCert } from "@/models/Certificate";

type CSRConfirmProps = {
    csr: CSR;
    setIsCSRConfirm: (isCSRConfirm: boolean) => void;
    ca_id: string;
}

function CSRConfirm({ csr, setIsCSRConfirm, ca_id }: CSRConfirmProps) {
    const handleDownloadCert = () => {
        issueCert(ca_id, csr.csr_pem);
    }
    const handleDownloadChainCert = () => {
        alert("Đang phát triển");
    }
    return ( 
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex justify-center z-50 mt-5">
            <div className="bg-white p-4 rounded-lg w-1/2 border-2 h-[550px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Đăng ký chứng chỉ</h1>
                    <Button className="hover:cursor-pointer" onClick={() => setIsCSRConfirm(false)}>Đóng</Button>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2">
                        <Label>Common Name: </Label>
                        <div>{csr.common_name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>Organization: </Label>
                        <div>{csr.organization}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>Organization Unit: </Label>
                        <div>{csr.organization_unit}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>Country: </Label>
                        <div>{csr.country}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>State: </Label>
                        <div>{csr.state}</div>
                    </div>
                    <div className="flex items-center gap-2"    >
                        <Label>Locality: </Label>
                        <div>{csr.locality}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>Email: </Label>
                        <div>{csr.email}</div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Label>Public Key: </Label>
                        <div className="text-sm w-full overflow-x-auto">{csr.public_key_pem}</div>
                    </div>
                </div>
                <div className="flex justify-start mt-4 gap-2">
                    <Button className="hover:cursor-pointer" onClick={handleDownloadCert}>Tải chứng chỉ đơn</Button>
                    <Button className="hover:cursor-pointer" onClick={handleDownloadChainCert}>Tải chứng chỉ chuỗi</Button>
                </div>
               
            </div>
        </div>
     );
}

export default CSRConfirm;  