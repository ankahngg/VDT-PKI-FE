"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-tables"
import { columns } from "./columns"
import { Certificate, getCertificate } from "@/models/Certificate"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import RevokeCert from "./RevokeCert"
import CertDetails from "./CertDetails"
import { Button } from "@/components/ui/button"

function CertsManagement() {
    const [data, setData] = useState<Certificate[]>([]);
    const [isRevoke, setIsRevoke] = useState(-1);
    const [isDetails, setIsDetails] = useState(-1);


    const refreshData = async () => {
        const data = await getCertificate();
        setData(data);
    }
    useEffect(() => {
        refreshData();
    }, []);
    return ( 
        <div className="p-4 relative">
            <div className="text-2xl font-bold">
                Quản lý chứng chỉ
            </div>
            {/* filter */}
            <div className="container mt-10 flex gap-4  ">
                {/* search */}
                <Input type="text" placeholder="Tìm kiếm" className="w-[200px]" />
                {/* filter by ca */}
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="CA Ký" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">CA 1</SelectItem>
                        <SelectItem value="2">CA 2</SelectItem>
                        <SelectItem value="3">CA 3</SelectItem>
                    </SelectContent>
                </Select>
                {/* filter by status */}
                <Select>    
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="2">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                {/* filter by key usage */}
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Key Usage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ký số</SelectItem>
                        <SelectItem value="2">Mã hóa</SelectItem>
                        <SelectItem value="3">Ký số và mã hóa</SelectItem>
                    </SelectContent>
                </Select>
                {/* filter by is ca */}
                <div className="flex items-center gap-2">
                    <Checkbox id="is-ca" />
                    <Label htmlFor="is-ca">
                        Là chứng chỉ CA
                    </Label>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <Button className="hover:cursor-pointer" >Lọc</Button>
            </div>
            <div className="container mt-4">
                <DataTable columns={columns(setIsRevoke, setIsDetails )} data={data} />
            </div>
            {isRevoke !== -1 && <RevokeCert setIsRevoke={setIsRevoke} data={data[isRevoke]} refreshData={refreshData} />}
            {isDetails !== -1 && <CertDetails data={data[isDetails]} setIsDetails={setIsDetails} />}
        </div>
     );
}

export default CertsManagement;