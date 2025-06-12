"use client"
import { useEffect, useState } from "react";
import { CA, getCA } from "@/models/CA";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function OCSPService() {
    const [ca, setCa] = useState<CA[]>([]);
    useEffect(() => {
        const fetchCA = async () => {
            const data = await getCA();
            setCa(data);
        }
        fetchCA();
    }, []);     
    
    return ( 
        <div className="p-4">
            <div className="text-2xl font-bold">
                Tra cứu chứng chỉ (OCSP)
            </div>
            <div className="mt-10 container flex items-center gap-4">
                <div>Chọn CA cấp chứng chỉ: </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn CA" />
                    </SelectTrigger>
                    <SelectContent>
                        {ca.map((item) => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>   
            </div>
            <div className="mt-5 flex flex-col gap-4 ">
                <div>Nhập serial number của chứng chỉ cần tra cứu: </div>
                <Input type="text" placeholder="Serial number" className="w-[300px]" />
            </div>
            <div className="mt-5 flex justify-start">
                <Button className="hover:cursor-pointer">Tra cứu</Button>
            </div>
        </div>  
    );
}

export default OCSPService;