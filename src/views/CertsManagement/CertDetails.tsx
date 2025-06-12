import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Certificate } from "@/models/Certificate";

type CertDetailsProps = {
    data: Certificate;
    setIsDetails: (isDetails: number) => void;
}

function CertDetails(props: CertDetailsProps) {
    return (
        <div className="absolute top-0 left-0 w-full  h-full flex justify-center z-50 mt-10">
            <div className="w-1/2 bg-white p-4 rounded-lg border-2 h-[550px]">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        Chi tiết chứng chỉ
                    </div>
                    <div>
                        <Button onClick={() => props.setIsDetails(-1)}>Đóng</Button>
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Số Serial: </Label>
                        <div className="text-sm font-bold">
                            {props.data.serial_number === "" ? "Không có" : props.data.serial_number}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">CA Ký: </Label>
                        <div className="text-sm font-bold">
                            {props.data.ca_name === "" ? "Không có" : props.data.ca_name}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Tên định danh: </Label>
                        <div className="text-sm font-bold">
                            {props.data.subject === "" ? "Không có" : props.data.subject}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Ngày bắt đầu: </Label>
                        <div className="text-sm font-bold">
                            {props.data.not_before === "" ? "Không có" : props.data.not_before}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Ngày hết hạn: </Label>
                        <div className="text-sm font-bold">
                            {props.data.not_after === "" ? "Không có" : props.data.not_after}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Trạng thái: </Label>
                        <div className="text-sm font-bold">
                            {props.data.status === "" ? "Không có" : props.data.status}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Là CA: </Label>
                        <div className="text-sm font-bold">
                            {props.data.is_ca ? "Có" : "Không"}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Key Usage: </Label>
                        <div className="text-sm font-bold">
                            {props.data.key_usage === "" ? "Không có" : props.data.key_usage}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4">
                            <Label htmlFor="subject">Public Key: </Label>
                            <div className="text-sm italic cursor-pointer underline" onClick={() => {
                                navigator.clipboard.writeText(props.data.public_key);
                            }}>Sao chép</div>
                        </div>
                        <div className="text-sm  w-full h-[50px]  break-words overflow-y-auto">
                            {props.data.public_key === "" ? "Không có" : props.data.public_key}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4">
                            <Label htmlFor="subject">Chứng chỉ: </Label>
                            <div className="text-sm italic cursor-pointer underline" onClick={() => {
                                navigator.clipboard.writeText(props.data.public_key);
                            }}>Sao chép</div>
                        </div>
                        <div className="text-sm  w-full h-[200px]  break-words overflow-y-auto">
                            {props.data.cert_pem === "" ? "Không có" : props.data.cert_pem}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CertDetails;