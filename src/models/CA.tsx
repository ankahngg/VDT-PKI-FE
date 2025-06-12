export type CA = {
    id: string;
    name: string;
    parent_ca_id: string;
    type: string;
    status: string;
    cert_pem: string;
    created_at: string;
    parent_ca_name: string;
    key_usage: string;
}

export async function getCA(): Promise<CA[]> {
    const res = await fetch("http://localhost:8080/ca");
    const data = await res.json();
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
                    parent_ca_name: parent_ca_name,
                    key_usage: item?.key_usage || "Chưa có"
                }
            }
        );
    } catch (error) {
      console.error("Failed to fetch CA data:", error);
      return [];
    }
}

export async function getCAById(id: string): Promise<CA> {
    const res = await fetch(`http://localhost:8080/ca/${id}`);
    const data = await res.json();
    return data;
}

export async function revokeCA(id: string, reason: string) {
    const res = await fetch(`http://localhost:8080/ca/${id}/revoke`, {
        method: "POST",
        body: JSON.stringify({
            reason: reason,
        }),
    });
    if(res.status !== 200) {
       
        return false;
    }
   
    return true;
}

