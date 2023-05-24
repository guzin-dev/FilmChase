"use client";

import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

export default function Filter(props) {
  const [filterList, setFilterList] = useState([]);
  const [older, setOlder] = useState("Desativado");
  const [rate, setRate] = useState(0);
  const [rateHandle, setRateHandle] = useState("Desativado");

  const applyFilters = () => {
    props.filtersApplied({
      filtersList: filterList,
      isOlder: older,
      rating: rate,
      hasRate: rateHandle,
    });
    props.onVisibilityClick();
  };

  const handleVisibilityClick = () => {
    props.onVisibilityClick();
  };
  return (
    <div className="z-10 text-white font-mont w-96 h-fit bg-[#1F1F1F] absolute right-3 top-2 rounded-md p-4">
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-semibold">Filtros</p>
        <AiOutlineClose
          onClick={handleVisibilityClick}
          className="hover:text-red-600 transition-all active:scale-90 cursor-pointer"
        ></AiOutlineClose>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-[#cdcdcd]">Genêro</p>
        <div className="flex max-w-full flex-wrap gap-2">
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 28])}
            ></input>
            <label className="ml-1">Ação</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 18])}
            ></input>
            <label className="ml-1">Drama</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 9648])}
            ></input>
            <label className="ml-1">Mistério</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 12])}
            ></input>
            <label className="ml-1">Aventura</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 10751])}
            ></input>
            <label className="ml-1">Família</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 10749])}
            ></input>
            <label className="ml-1">Romance</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 16])}
            ></input>
            <label className="ml-1">Animação</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 14])}
            ></input>
            <label className="ml-1">Fantasia</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 878])}
            ></input>
            <label className="ml-1">Ficção Cientifíca</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 35])}
            ></input>
            <label className="ml-1">Comédia</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 36])}
            ></input>
            <label className="ml-1">História</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 10752])}
            ></input>
            <label className="ml-1">Guerra</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 80])}
            ></input>
            <label className="ml-1">Crime</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 27])}
            ></input>
            <label className="ml-1">Horror</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 99])}
            ></input>
            <label className="ml-1">Documentário</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={() => setFilterList([...filterList, 10402])}
            ></input>
            <label className="ml-1">Música</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <p className="text-[#cdcdcd]">Maior de Idade</p>
        <div className="flex gap-4 mt-2">
          <div>
            <input type="radio" name="olderType"></input>
            <label
              className="ml-1"
              onClick={() => {
                setOlder("Desativado");
              }}
            >
              Ambos
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="olderType"
              onClick={() => {
                setOlder("Maior");
              }}
            ></input>
            <label className="ml-1">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              name="olderType"
              onClick={() => {
                setOlder("Menor");
              }}
            ></input>
            <label className="ml-1">Não</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <p className="text-[#cdcdcd]">Nota {rate}</p>
        <input
          className="w-full"
          type="range"
          min={0}
          max={10}
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        ></input>
        <div className="flex gap-4 mt-2">
          <div>
            <input
              type="radio"
              name="rangeType"
              onClick={() => {
                setRateHandle("Desativado");
              }}
            ></input>
            <label className="ml-1">Desativado</label>
          </div>
          <div>
            <input
              type="radio"
              name="rangeType"
              onClick={() => {
                setRateHandle("Superior");
              }}
            ></input>
            <label className="ml-1">Superior</label>
          </div>
          <div>
            <input
              type="radio"
              name="rangeType"
              onClick={() => {
                setRateHandle("Inferior");
              }}
            ></input>
            <label className="ml-1">Inferior</label>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <PrimaryButton onClick={applyFilters}>Confirmar</PrimaryButton>
      </div>
    </div>
  );
}
