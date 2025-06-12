"use client"
import { Button } from "@/components/ui/button";
import { columns } from "./columns";


import { useState, useEffect } from "react";
import AddCA from "./AddCA";
import { CA, getCA } from "@/models/CA";
import CADetails from "./CADetails";
import { DataTable } from "./data-tables";
import RevokeCA from "./RevokeCA";



type ID_NAME = {
    id: string;
    name: string;
}

function CasManagement() {
    const [addCA, setAddCA] = useState(false);
    const [data, setData] = useState<CA[]>([]);
    const [isDetails, setIsDetails] = useState(-1);
    const [idName, setIdName] = useState<ID_NAME[]>([]);
    const [isRevoke, setIsRevoke] = useState(-1);
    const refreshData = async () => {
        const data = await getCA();
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
    console.log(data)

    return ( 
        <div className="p-4 relative">
            <div className="text-2xl font-bold">
                Quản lý CA
            </div>
            <div className="container mt-5">
                <Button className="hover:cursor-pointer" onClick={() => setAddCA(true)}>Thêm CA</Button>
            </div>
            <div className="container mt-5">
                <DataTable columns={columns({setIsDetails, setIsRevoke, refreshData})} data={data} />
            </div>
            {addCA && <AddCA setAddCA={setAddCA} idName={idName} refreshData={refreshData} />}
            {isDetails !== -1 && <CADetails setIsDetails={setIsDetails} data={data[isDetails]} />}
            {isRevoke !== -1 && <RevokeCA setIsRevoke={setIsRevoke} data={data[isRevoke]} />}
        </div>
     );
}

export default CasManagement;