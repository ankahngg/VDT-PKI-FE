import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type ID_NAME = {
    id: string;
    name: string;
}
type AddCAProps = {
    setAddCA: (addCA: boolean) => void;
    idName: ID_NAME[];
    refreshData: () => void;
}

function AddCA({setAddCA, idName, refreshData}: AddCAProps) {
    console.log(idName);
    const [name, setName] = useState("");
    const [parent_ca_id, setParentCAId] = useState("");
    const [type, setType] = useState("");
    const addCA = async () => {
        const res = await fetch("http://localhost:8080/ca/create", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                parent_ca_id: parent_ca_id,
                type: type,
            })
        })
        if (res.status === 200) {
            alert("Thêm CA thành công");
            setAddCA(false);
            refreshData();
        } else {
            alert("Thêm CA thất bại");
        }
    }
    return ( 
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 ">
            <div className="border-2 bg-white border-gray-300 p-4 rounded-lg w-1/4  ">
                <div className="text-2xl font-bold text-center">Thêm CA</div>
                <div className="flex flex-col gap-4">
                    <div>
                        <div>Tên CA</div>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <div>Parent CA</div>
                        <Select value={parent_ca_id} onValueChange={(value) => setParentCAId(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn parent CA" />
                            </SelectTrigger>
                            <SelectContent>
                                {idName.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div>Loại CA</div>
                        <Select value={type} onValueChange={(value) => setType(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn loại CA" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="root">Root CA</SelectItem>
                                <SelectItem value="sub">Sub CA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-start gap-4">
                        <Button onClick={() => setAddCA(false)}>Hủy</Button>
                        <Button onClick={addCA}>Thêm</Button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default AddCA;