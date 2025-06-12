import { CA } from "./CA";

export type CRL = {
    id: string;
    ca_id: string;
    ca_name: string;
    crl_pem: string;
    updated_at: string;
}

export async function getCRL(): Promise<CRL[]> {
    const res = await fetch("http://localhost:8080/ca");
    const data = await res.json();
   
    try {
        return data.cas.map((item: any) => {
            
            return ({
                id: "",
                ca_id: item.id,
                ca_name: item.name,
                crl_pem: "",
                updated_at: "",
            });
        });
        
    } catch (error) {
        console.error("Failed to fetch CRL data:", error);
        return [];
    }
}
