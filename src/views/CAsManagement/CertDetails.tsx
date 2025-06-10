import { Button } from "@/components/ui/button";

type CertDetailsProps = {
    setCertDetails: (certDetails: number) => void;
    data: string;
}

function CertDetails({setCertDetails, data}: CertDetailsProps) {
    return ( 
        <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center">
            <div className="border-2 border-gray-300 p-4 rounded-lg w-1/2  ">
                <h1 className="text-2xl font-bold">Cert Details</h1>   
                <div className="h-96 overflow-y-auto">
                    {data}
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={() => setCertDetails(-1)}>Close</Button>
                    <Button onClick={() => {
                        const link = document.createElement("a");
                        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(data);
                        link.download = "cert.pem";
                        link.click();
                        link.remove();
                    }}>Download</Button>
                </div>
            </div>

        </div>
     );
}

export default CertDetails;