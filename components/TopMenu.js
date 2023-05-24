"use client";

import Link from "next/link";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineExplore, MdFavorite, MdOutlineExitToApp } from "react-icons/md";

export default function TopMenu(props) {
  return (
    <div className="2xl:hidden flex flex-col items-center justify-center">
      <div className="text-[#A1A1A1] border-b border-[#1F1F1F] py-4">
        <div className="w-90 overflow-x-auto">
          <div className="mt-2 flex gap-2 items-center flex-wrap justify-center">
            <Link
              href="/homepage"
              className={
                props.homepage
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
              }
            >
              <MdOutlineExplore></MdOutlineExplore>
              <p className="font-bold">Buscar</p>
            </Link>
            <Link
              href="/favorites"
              className={
                props.favorites
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
              }
            >
              <MdFavorite></MdFavorite>
              <p className="font-bold">Curtidos</p>
            </Link>
            <Link
              href="/userList"
              className={
                props.userList
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 rounded-md gap-2 cursor-pointer"
              }
            >
              <AiOutlineUnorderedList></AiOutlineUnorderedList>
              <p className="font-bold">Minha lista</p>
            </Link>
          </div>
        </div>
      </div>
      <Link
        href="/"
        className="active:scale-90 mt-4 mb-4 flex gap-2 p-3 rounded-md cursor-pointer hover:bg-slate-800 transition-all"
      >
        <MdOutlineExitToApp className="text-[#A1A1A1]"></MdOutlineExitToApp>
        <p className="text-[#A1A1A1] font-bold">Sair da conta</p>
      </Link>
    </div>
  );
}
