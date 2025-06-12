import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Certificate, revokeCert } from "@/models/Certificate";
import { useState } from "react";

const reasonList = [
    {
        value: "unspecified",
        label: "Không rõ lý do"
    },
    {
        value: "keyCompromise",
        label: "Lộ private key"
    },
    {
        value: "cACompromise",
        label: "CA bị lộ key"
    },
    {
        value: "affiliationChanged",
        label: "Người dùng chuyển tổ chức, vị trí mới"
    },
    {
        value: "superseded",
        label: "Đã có cert mới thay thế"
    },
    {
        value: "cessationOfOperation",
        label: "Không cần dùng cert nữa"
    },
    {
        value: "certificateHold",
        label: "Tạm dừng cert (ít dùng)"
    },
]

type RevokeCertProps = {
    setIsRevoke: (isRevoke: number) => void;
    data: Certificate;
    refreshData: () => void;
}

function RevokeCert(props: RevokeCertProps) {
    const [reason, setReason] = useState<string>("");
    const handleRevokeCert = async () => {
        if(reason === "") {
            alert("Vui lòng chọn lý do");
            return;
        }
        const isRevoked = await revokeCert(props.data.serial_number, reason);
        if(isRevoked) {
            alert("Thu hồi thành công");
            props.setIsRevoke(-1);
            props.refreshData();
        } else {
            alert("Thu hồi thất bại");
            props.setIsRevoke(-1);
        }
    }
    return ( 
        <div className="absolute top-0 left-0 w-full  h-full flex justify-center items-center z-50 mt-10">
            <div className="mx-auto w-1/2 bg-white p-4 rounded-lg border-2">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        Thu hồi chứng chỉ
                    </div>
                    <Button className="hover:cursor-pointer" onClick={() => props.setIsRevoke(-1)}>Đóng</Button>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Số Serial: </Label>
                        <div className="text-lg font-bold">
                            {props.data.serial_number === "" ? "Không có" : props.data.serial_number}
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <Label htmlFor="subject">CA Ký: </Label>
                        <div className="text-lg font-bold">
                            {props.data.ca_name === "" ? "Không có" : props.data.ca_name}
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <Label htmlFor="subject">Tên định danh: </Label>
                        <div className="text-lg font-bold">
                            {props.data.subject === "" ? "Không có" : props.data.subject}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="reason">Lý do</Label>
                        <Select value={reason} onValueChange={setReason}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Chọn lý do" />
                            </SelectTrigger>
                            <SelectContent>
                                {reasonList.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                    </div>
                </div>
                
                <div className="flex justify-start gap-4 mt-5">
                    <Button className="hover:cursor-pointer" onClick={handleRevokeCert}>Xác nhận</Button>
                    
                </div>
                
            </div>
        </div>
     );
}

export default RevokeCert;