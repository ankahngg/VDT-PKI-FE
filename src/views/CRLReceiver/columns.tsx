"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
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
import { CRL } from "@/models/CRL"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type CertDetailsProps = {
  setCertDetails: (certDetails: number) => void;
  refreshData: () => void;
}

export const columns: ColumnDef<CRL>[] = [
  {
    accessorKey: "ca_name",
    header: ({ column }) => {
      return <div
        
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:cursor-pointer flex items-center"
      >
        Tên CA
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    },
    cell: ({ row }) => {
      return <div className="w-[100px] ">{row.original.ca_name}</div>
    }
  },
  {
    accessorKey: "updated_at",
    header: "Ngày cập nhật",
    cell: ({ row }) => {
      if (row.original.updated_at === "") {
        return <div>Đang phát triển</div>
      }
      const date = new Date(row.original.updated_at);
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>

    }
  },
  {
    accessorKey: "crl_pem",
    header: "CRL .pem",
    cell: ({ row }) => {
      const downloadFile = async (ca_id: string) => {
        const res = await fetch(`http://localhost:8080/ca/crl?ca_id=${ca_id}`);
        if (res.status === 200) {
          const link = document.createElement("a");
          link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(await res.text());
          link.download = `${row.original.ca_name}_crl.pem`;
          link.click();
          link.remove();
        } else {
          alert("Tải xuống thất bại");
        }
        
      }
      return <div className="text-blue-500 font-bold cursor-pointer underline" onClick={() => {
        downloadFile(row.original.ca_id);
      }}
      >Tải xuống</div>
    }
  },
  {
    accessorKey: "crl_crl",
    header: "CRL .crl",
    cell: ({ row }) => {
      return <div className="text-blue-500 font-bold cursor-pointer underline" onClick={() => {
        alert("Chức năng đang phát triển")
      }}
      >Tải xuống</div>
    }
  },
  
  
  
    
  
]