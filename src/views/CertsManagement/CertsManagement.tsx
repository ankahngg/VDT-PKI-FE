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