"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CA } from "@/models/CA"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type CertDetailsProps = {
  setCertDetails: (certDetails: number) => void;
  refreshData: () => void;
}

export const columns: (props: CertDetailsProps) => ColumnDef<CA>[] = (props) => [
    
  {
    accessorKey: "name",
    header: "Tên CA",
  },
  {
    accessorKey: "parent_ca_id",
    header: "CA cha",
    cell: ({ row }) => {
      return <div>{row.original.parent_ca_name}</div>
    }
  },
  {
    accessorKey: "type",
    header: "Loại CA",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return <div className={`${row.original.status === "active" ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>{row.original.status}</div>
    }
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
  },
  {
    accessorKey: "cert_pem",
    header: "Cert PEM",
    cell: ({ row, table }) => {
      return <div className="text-blue-500 font-bold cursor-pointer underline" onClick={() => {
        props.setCertDetails(table.getRowModel().rows.indexOf(row));
      }}
      >Xem chi tiết</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
        async function deleteCA(id: string) {
            const res = await fetch(`http://localhost:8080/ca/${id}`, {
                method: "DELETE",
            })
            if (res.status === 200) {
                alert("Xóa CA thành công")
                props.refreshData();
            } else {
                alert("Xóa CA thất bại")
            }
        }
        async function changeStatus(id: string) {
            const res = await fetch(`http://localhost:8080/ca/${id}/status`, {
                method: "PUT",
                body: JSON.stringify({
                    status: row.original.status === "active" ? "revoked" : "active"
                })
            })
            if (res.status === 200) {
                alert("Thay đổi trạng thái thành công")
                props.refreshData();
            } else {
                alert("Thay đổi trạng thái thất bại")
            }
        }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              deleteCA(row.original.id);
            }}>Xóa</DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              changeStatus(row.original.id);
            }}>{row.original.status === "active" ? "Thu hồi" : "Kích hoạt"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]