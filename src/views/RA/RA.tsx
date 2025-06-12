"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CA, getCA } from "@/models/CA";
import { CSR, parseAndVerifyCSR, parseCSR } from "@/models/CSR";
import CSRConfirm from "./CSRConfirm";

function RA() {
    const [csrText, setCsrText] = useState("");
    const [ca, setCa] = useState<CA[]>([]);
    const [csr, setCsr] = useState<CSR | null>(null);
    const [isCSRConfirm, setIsCSRConfirm] = useState(false);
    const [ca_id, setCaId] = useState("");
    useEffect(() => {
        const fetchCA = async () => {
            const data = await getCA();
            setCa(data);
        }
        fetchCA();
    }, []);
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCsrText(e.target?.result as string);
            };
            reader.readAsText(file);
        }
    };
    const handleSubmit = () => {
        if(ca_id === "") {
            alert("Vui lòng chọn CA");
            return;
        }
        const isCSRValid = parseAndVerifyCSR(csrText);
        if (isCSRValid) {
            const csr = parseCSR(csrText);
            setCsr(csr);
            setIsCSRConfirm(true);
        }
        else {
            alert("CSR không hợp lệ");
        }
    }
    console.log(ca_id);
    return (
        <div className="p-4 relative">
            <div className="text-2xl font-bold">
                RA Web
            </div>
            <div className="space-y-4 mt-10 w-1/2 ">
                <div className="flex items-center gap-4">
                    <div>Chọn CA cấp chứng chỉ: </div>
                    <Select onValueChange={(value) => setCaId(value)}>
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
                <div className="flex gap-4 flex-col">
                    <Label htmlFor="csr-upload">Tải lên file (.csr)</Label>
                    <Input type="file" id="csr-upload" accept=".csr,.pem,.txt" onChange={handleFileUpload} />
                </div>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="csr-text">Hoặc nhập CSR</Label>
                    <Textarea
                    className="w-full h-[200px]"
                    id="csr-text"
                    placeholder="-----BEGIN CERTIFICATE REQUEST-----\nMIIC..."
                    value={csrText}
                    onChange={(e) => setCsrText(e.target.value)}
                    rows={10}
                    />
                </div>
                <div className="flex justify-end">
                    <Button className="hover:cursor-pointer" onClick={handleSubmit}>Xác nhận</Button>
                </div>

            </div>
            {isCSRConfirm && csr && <CSRConfirm csr={csr} setIsCSRConfirm={setIsCSRConfirm} ca_id={ca_id} />}
        </div>
    );
}

export default RA;