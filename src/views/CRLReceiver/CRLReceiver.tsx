"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-tables";
import { useEffect, useState } from "react";

import { CRL, getCRL } from "@/models/CRL";


function CRLReceiver() {
    const [data, setData] = useState<CRL[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCRL();
            setData(data);
        }
        fetchData();
    }, []);

    return (    
        <div className="p-4">
            <div className="text-2xl font-bold">
                Nhận danh sách CRL
            </div>
            <div className="mt-10 container ">
                <DataTable columns={columns} data={data} />
            </div>
           

        </div>
    );
}

export default CRLReceiver;