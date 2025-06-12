import { getCA } from "./CA";

export type Certificate = {
    ca_id: string;
    ca_name: string;
    serial_number: string;
    not_after: string;
    not_before: string;
    status: string;
    cert_pem: string;
    subject: string;
    issuer: string;
    key_usage: string;
    is_ca: boolean;
    public_key: string;
}

export async function getCertificate(): Promise<Certificate[]> {
    const ca = await getCA();
    const res = await fetch("http://localhost:8080/certificates");
    const data = await res.json();
    if(data.certificates==null) {
        return [];
    }
    try {
            return data.certificates.map((item: any) => {
                const ca_name = ca.find((ca: any) => ca.id === item.ca_id)?.name;
                return {
                    ca_id: item.ca_id,
                    ca_name: ca_name,
                    serial_number: item.serial_number,
                    not_after: item.not_after,
                    not_before: item.not_before,
                    status: item.status,
                    cert_pem: item.cert_pem,
                    subject: item.subject,
                    issuer: "",
                    key_usage: "",
                    is_ca: "",
                    public_key: "",
                }
            });
    } catch (error) {
        console.error("Failed to fetch certificate data:", error);
        return [];
    }
}

export async function issueCert(ca_id: string, csr: string) {
    const res = await fetch("http://localhost:8080/ca/issue", {
        method: "POST",
        body: JSON.stringify({
            ca_id: ca_id,
            csr: csr,
        }),
    });
    if(res.status !== 200) {
        alert("Tải xuống thất bại");
        return;
    }
    const data = await res.json();
    const cert_pem = data.cert_pem;
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(cert_pem);
    a.download = "cert.pem";
    a.click();
    a.remove();
}

export async function revokeCert(serial_number: string, reason: string) {
    const res = await fetch("http://localhost:8080/ca/revoke", {
        method: "POST",
        body: JSON.stringify({
            serial_number: serial_number,
            reason: reason,
        }),
    });
    if(res.status !== 200) {
        return false;
    }
    return true;
}



export async function downloadCertChain(ca_id: string, cert_pem: string) {
    
}
