"use client"
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-tables";
import { useState, useEffect } from "react";
import AddCA from "./AddCA";
import { CA } from "@/models/CA";
import CertDetails from "./CertDetails";

async function getData(): Promise<CA[]> {
    const res = await fetch("http://localhost:8080/ca");
    const data = await res.json();
    console.log(data);
    // Fetch data from your API here.
    try {
        return data.cas.map((item: any) => 
            {
                const parent_ca_name = data.cas.find((parent: CA) => parent.id === item.parent_ca_id)?.name;
               
                return {
                    id: item.id,
                    name: item.name,
                    parent_ca_id: item.parent_ca_id,
                    type: item.type,
                    status: item.status,
                    created_at: item.created_at,
                    cert_pem: item.cert_pem,
                    parent_ca_name: parent_ca_name
                }
            }
        );
    } catch (error) {
      console.error("Failed to fetch CA data:", error);
      return [];
    }
   
}
type ID_NAME = {
    id: string;
    name: string;
}

function CasManagement() {
    const [addCA, setAddCA] = useState(false);
    const [data, setData] = useState<CA[]>([]);
    const [certDetails, setCertDetails] = useState(-1);
    const [idName, setIdName] = useState<ID_NAME[]>([]);

    const refreshData = async () => {
        const data = await getData();
        setData(data);

        const idName = data.map((item: CA) => ({
            id: item.id,
            name: item.name
        }));
        setIdName(idName);
    };

    useEffect(() => {
        refreshData();
    }, []);

    return ( 
        <div className="p-4 relative">
            <div className="text-2xl font-bold">
                Quản lý CA
            </div>
            
            <div className="container mt-10">
                <Button className="hover:cursor-pointer" onClick={() => setAddCA(true)}>Thêm CA</Button>
            </div>
            <div className="container mt-5">
                <DataTable columns={columns({setCertDetails, refreshData})} data={data} />
            </div>
            {addCA && <AddCA setAddCA={setAddCA} idName={idName} refreshData={refreshData} />}
            {certDetails !== -1 && <CertDetails setCertDetails={setCertDetails} data={data[certDetails].cert_pem} />}
            
        </div>
     );
}

export default CasManagement;