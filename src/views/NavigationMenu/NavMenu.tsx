import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

function NavMenu() {
    return ( 
        <div className='flex justify-center border-2 border-gray-300 bg-gray-100 items-center'>
            <div className="flex">
                <div className='hover:bg-gray-200 flex items-center'>
                    <Link href="/" className=' border-gray-300 text-lg flex items-center px-3 py-2'>Home</Link>
                </div>
                <div className=' hover:bg-gray-200' >
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' border-gray-300 hover:cursor-pointer text-lg px-3 py-2'>CA Functions</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className='text-lg hover:cursor-pointer' asChild>
                                <Link href="/CA/CAsManagement" >Quản Lý CA</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:cursor-pointer text-lg' asChild>
                                <Link href="/CA/KeysManagement">Quản Lý Khóa</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:cursor-pointer text-lg' asChild>
                                <Link href="/CA/CertsManagement">Quản lý chứng chỉ</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className=' hover:bg-gray-200' >
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' hover:cursor-pointer text-lg px-3 py-2'>VA Functions</DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuItem className='hover:cursor-pointer text-lg' asChild><Link href="/VA/CRL">Nhận danh sách CRL</Link></DropdownMenuItem>
                            <DropdownMenuItem className='hover:cursor-pointer text-lg' asChild><Link href="/VA/OCSP">Tra cứu chứng chỉ (OCSP)</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='hover:bg-gray-200 flex items-center'>
                    <Link href="/RA" className=' text-lg flex items-center px-3 py-2'>RA Web</Link>
                </div>
                
                <div className='flex hover:bg-gray-200 items-center'>
                    <Link href="/login">
                        <div className='flex px-3 py-2'>
                            <div className='text-red-500 font-bold'>Admin</div>
                            <div className='text-[10px]'>Đăng nhập</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavMenu;