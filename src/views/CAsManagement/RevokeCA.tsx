import { CA } from "@/models/CA";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { revokeCA } from "@/models/CA";

type RevokeCAProps = {
    setIsRevoke: (isRevoke: number) => void;
    data: CA;
}

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
        value: "decommissioned",
        label: "CA không còn hoạt động"
    },
    {
        value: "superseded",
        label: "Đã có CA mới thay thế"
    },
    {
        value: "illegalUse",
        label: "Sử dụng không hợp pháp"
    },
    {
        value: "notTrusted",
        label: "Không được tin tưởng"
    },
    {
        value: "errorConfig",
        label: "Lỗi cấu hình"
    }
]


function RevokeCA({setIsRevoke, data}: RevokeCAProps) {
    const [confirm, setConfirm] = useState(false);
    const createdAt = new Date(data.created_at).toLocaleDateString("vi-VN");
    const [reason, setReason] = useState("");
    const handleRevokeCA = async () => {
        if(reason === "") {
            alert("Vui lòng chọn lý do");
            return;
        }
        const isRevoked = await revokeCA(data.id,reason);
        if(isRevoked) {
            alert("Thu hồi thành công");
            setIsRevoke(-1);
        } else {
            alert("Thu hồi thất bại");
            setIsRevoke(-1);
        }
    }
    function ConfirmRevokeCA() {
        return (
            <div className="flex gap-2 items-center">
                <div className="text-sm font-bold">Bạn có chắc chắn muốn thu hồi CA này không?</div>
                <div className="flex gap-4 items-center mt-2">
                    <Button className="hover:cursor-pointer bg-red-500 text-white hover:bg-red-600" onClick={handleRevokeCA}>Xác nhận</Button>
                    <Button className="hover:cursor-pointer" onClick={() => setConfirm(false)}>Hủy</Button>
                </div>
            </div>
        )
    }
    return ( 
        <div className="absolute top-0 left-0 w-full h-full flex justify-center z-50 mt-10">
            <div className="border-2 border-gray-300 bg-white p-4 rounded-lg w-1/2 ">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Thu hồi CA</h1>   
                    <Button className="hover:cursor-pointer" onClick={() => setIsRevoke(-1)}>Đóng</Button>
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Tên CA: </Label>
                        <div className="text-sm font-bold">{data.name}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Loại CA: </Label>
                        <div className="text-sm font-bold">{data.type === "root" ? "Root CA" : "Sub CA"}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Key Usage: </Label>
                        <div className="text-sm font-bold">{data.key_usage}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Ngày tạo: </Label>
                        <div className="text-sm font-bold">{createdAt}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Lý do thu hồi: </Label>
                        <Select defaultValue={reasonList[0].value} onValueChange={setReason}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn lý do thu hồi" /> 
                            </SelectTrigger>
                            <SelectContent> 
                                {reasonList.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                </div>
                <div className="flex justify-between mt-5 items-center">{
                    confirm ? <ConfirmRevokeCA /> : <Button className="hover:cursor-pointer" onClick={() => {
                        if(reason === "") {
                            alert("Vui lòng chọn lý do");
                            return;
                        }
                        setConfirm(true)
                    }}>Thu hồi</Button>
                }
                </div>
            </div>
        </div>
    );
}

export default RevokeCA;