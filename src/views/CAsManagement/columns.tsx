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
  setIsDetails: (isDetails: number) => void;
  setIsRevoke: (isRevoke: number) => void;
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
      return <div className={`${row.original.status === "active" ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>
        {row.original.status === "active" && <div className="text-green-500 font-bold">Đang hoạt động</div>}
        {row.original.status === "revoked" && <div className="text-red-500 font-bold">Đã thu hồi</div>}
        </div>
    }
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => {
      // format date to dd/mm/yyyy
      const date = new Date(row.original.created_at);
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
    }
  },
  {
    accessorKey: "key_usage",
    header: "Key Usage",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
        async function revokeCA(id: string) {
            const res = await fetch(`http://localhost:8080/ca/${id}/revoke`, {
                method: "PUT",
            })
            if (res.status === 200) {
                alert("Thu hồi CA thành công")
                props.refreshData();
            } else {
                alert("Thu hồi CA thất bại")
            }
        }

      async function downloadSingleCert(cert: string, name: string) {
        const link = document.createElement("a");
        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(cert);
        link.download = `${name}_cert.pem`;
        link.click();
        link.remove();

      }

      async function downloadChainCert(id: string) {
        alert("Chức năng đang phát triển")
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
              props.setIsRevoke(row.index);
            }}>Thu hồi</DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              props.setIsDetails(row.index);
            }}>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              downloadSingleCert(row.original.cert_pem, row.original.name);
            }}>Tải chứng chỉ đơn</DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              downloadChainCert(row.original.id);
            }}>Tải chứng chỉ chuỗi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]