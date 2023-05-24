"use client";

import Link from "next/link";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineExplore, MdFavorite, MdOutlineExitToApp } from "react-icons/md";

export default function LateralMenu(props) {
  return (
    <div className="max-2xl:hidden border-r border-[#1F1F1F] h-screen w-96 flex">
      <div className="ml-8">
        <div className="text-2xl mt-14">
          <span className="text-white font-light">Film</span>
          <span className="text-[#AC1A19] font-bold">Chase</span>
        </div>
        <div className="text-[#A1A1A1] mt-14 border-b border-[#1F1F1F] py-4">
          <p className="text-xl">Ínicio</p>
          <div className="mt-2 flex flex-col gap-2">
            <Link
              href="/homepage"
              className={
                props.homepage
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
              }
            >
              <MdOutlineExplore></MdOutlineExplore>
              <p className="font-bold">Buscar</p>
            </Link>
            <Link
              href="/favorites"
              className={
                props.favorites
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
              }
            >
              <MdFavorite></MdFavorite>
              <p className="font-bold">Curtidos</p>
            </Link>
            <Link
              href="/userList"
              className={
                props.userList
                  ? "active:scale-90 bg-white text-[#AC1A19] transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
                  : "active:scale-90 hover:bg-slate-800  transition-all flex items-center p-3 w-60 rounded-md gap-2 cursor-pointer"
              }
            >
              <AiOutlineUnorderedList></AiOutlineUnorderedList>
              <p className="font-bold">Minha lista</p>
            </Link>
          </div>
        </div>
        <Link
          href="/"
          className="active:scale-90 mt-4 flex gap-2 p-3 rounded-md cursor-pointer hover:bg-slate-800 transition-all"
        >
          <MdOutlineExitToApp className="text-[#A1A1A1]"></MdOutlineExitToApp>
          <p className="text-[#A1A1A1] font-bold">Sair da conta</p>
        </Link>
      </div>
    </div>
  );
}
