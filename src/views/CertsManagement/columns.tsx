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
import { Certificate } from "@/models/Certificate"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type CertDetailsProps = {
  setCertDetails: (certDetails: number) => void;
  refreshData: () => void;
  setIsRevoke: (isRevoke: number) => void;
  setIsDetails: (isDetails: number) => void;
}

export const columns: (setIsRevoke: (isRevoke: number) => void, setIsDetails: (isDetails: number) => void) =>   ColumnDef<Certificate>[] = (setIsRevoke: (isRevoke: number) => void, setIsDetails: (isDetails: number) => void) => [
  
  {
    accessorKey: "subject",
    header: "Định danh ",
  },
  {
    accessorKey: "ca_name",
    header: "CA Ký",
  },
  {
    accessorKey: "serial_number",
    header: "Số sêri",
    cell: ({ row }) => {
      return <div>{row.original.serial_number}</div>
    }
  },
  {
    accessorKey: "not_before",
    header: "Ngày bắt đầu",
    cell: ({ row }) => {
      // format date to dd/mm/yyyy
      const date = new Date(row.original.not_before);
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
    }
  },
  {
    accessorKey: "not_after",
    header: "Ngày hết hạn",
    cell: ({ row }) => {  
      // format date to dd/mm/yyyy
      const date = new Date(row.original.not_after);
      return <div>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return <div className={`${row.original.status === "valid" ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>
        {row.original.status === "valid" ? "Hợp lệ" : "Đã Thu hồi"}
        </div>
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
      function downloadCert(cert_pem: string) {
        const a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(cert_pem);
        a.download = "cert.pem";
        a.click();
        a.remove();
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
            {row.original.status === "valid" ? (  
              <DropdownMenuItem className=" cursor-pointer" onClick={() => {
                setIsRevoke(row.index);
              }}>Thu hồi</DropdownMenuItem>
            ) : (
              <DropdownMenuItem className=" cursor-pointer" onClick={() => {
                alert("Chứng chỉ đã thu hồi")
              }}>Thu hồi</DropdownMenuItem>
            )}
            <DropdownMenuItem className=" cursor-pointer" 
            onClick={() => {
              setIsDetails(row.index);
            }}
            >Xem chi tiết</DropdownMenuItem>

            <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              downloadCert(row.original.cert_pem);
            }}>Tải chứng chỉ đơn</DropdownMenuItem>
             <DropdownMenuItem className=" cursor-pointer" onClick={() => {
              alert("Đang phát triển")
            }}>Tải chứng chỉ chuỗi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]