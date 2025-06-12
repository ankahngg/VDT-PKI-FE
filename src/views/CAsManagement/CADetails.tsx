import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { CA } from "@/models/CA";

type CADetailsProps = {
    setIsDetails: (isDetails: number) => void;
    data: CA;
}

function CADetails({setIsDetails, data}: CADetailsProps) {
    // format date to dd/mm/yyyy
    const createdAt = new Date(data.created_at).toLocaleDateString("vi-VN");
    return ( 
        <div className="absolute top-0 left-0 w-full h-full flex justify-center z-50 mt-10">
            <div className="border-2 border-gray-300 bg-white p-4 rounded-lg w-1/2  ">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Chi tiết CA</h1>   
                    <Button className="hover:cursor-pointer" onClick={() => setIsDetails(-1)}>Đóng</Button>
                </div>
                
                

                <div className="flex flex-col gap-4 mt-5">
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Tên CA: </Label>
                        <div className="text-sm font-bold">{data.name || "Chưa có"}</div>
                    </div> 
                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">Loại CA: </Label>
                        <div className="text-sm font-bold">{data.type === "root" ? "Root CA" : "Sub CA"}</div>
                    </div> 

                    <div className="flex gap-2 items-center">
                        <Label htmlFor="name">CA Cha: </Label>
                        <div className="text-sm font-bold">{data.parent_ca_name || "Chưa có"}</div>
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
                        <Label htmlFor="name">Trạng thái: </Label>
                        <div className={`text-sm font-bold ${data.status === "active" ? "text-green-500" : "text-red-500"}`}>
                            {data.status === "active" ? "Đang hoạt động" : "Đã thu hồi"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Chứng chỉ </Label>
                        <div>
                            <Tabs defaultValue="account" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="account">Chứng chỉ đơn</TabsTrigger>
                                    <TabsTrigger value="password">Chứng chỉ chuỗi</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                    <div className="text-sm font-bold h-[150px] overflow-y-auto">
                                        {data.cert_pem}
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="password">
                                    <div className="text-sm font-bold h-[150px] overflow-y-auto">
                                        Đang phát triển
                                    </div>
                                </TabsContent>
                            </Tabs>

                        </div>
                        
                    </div>
                    
                </div>
                
                {/* <div className="flex justify-end gap-4">
                   
                    <Button onClick={() => {
                        const link = document.createElement("a");
                        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(data.cert_pem);
                        link.download = "cert.pem";
                        link.click();
                        link.remove();
                    }}>Tải xuống</Button>
                </div> */}
            </div>

        </div>
     );
}

export default CADetails;