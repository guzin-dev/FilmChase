"use client";

import { Fragment, useEffect, useState } from "react";
import FilmCard from "../../components/FilmCard.js";
import LateralMenu from "../../components/LateralMenu.js";
import Filter from "@/components/Filter.js";
import PrimaryButton from "@/components/PrimaryButton.js";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading.js";
import TopMenu from "@/components/TopMenu.js";

import { AiOutlineSearch, AiOutlineUnorderedList } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";

import { db } from "../../auth/firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export default function Homepage() {
  const [openFilters, setOpenFilters] = useState(false);
  const [openFilmDetails, setOpenFilmDetails] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filtersList: [],
    hasRate: "Desativado",
    isOlder: "Desativado",
    rating: 0,
  });

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUxM2VhMDAxZDUyMTNkYjExMWQ4OTI5M2E0YjIyNCIsInN1YiI6IjY0NWNmZDFlMWI3MGFlMDBmZDZkNWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZUoMEgF3X1GkXtbYo8Y4kxSyQuNYBlL6f28bUM23Rk";
  function getFilms() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${token}&page=${page}&language=pt-BR`;

    // Aplicar filtro de nota
    if (filters.hasRate === "Superior") {
      url += `&vote_average.gte=${filters.rating}`;
    } else if (filters.hasRate === "Inferior") {
      url += `&vote_average.lte=${filters.rating}`;
    }

    // Aplicar filtro de maior de idade
    if (filters.isOlder === "Maior") {
      url += "&certification_country=BR&certification=R";
    } else if (filters.isOlder === "Menor") {
      url += "&certification_country=BR&certification=L";
    }

    // Aplicar filtro de gêneros
    if (filters.filtersList.length > 0) {
      const genreIds = filters.filtersList.join(",");
      url += `&with_genres=${genreIds}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUxM2VhMDAxZDUyMTNkYjExMWQ4OTI5M2E0YjIyNCIsInN1YiI6IjY0NWNmZDFlMWI3MGFlMDBmZDZkNWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZUoMEgF3X1GkXtbYo8Y4kxSyQuNYBlL6f28bUM23Rk",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const newFilms = response.results;

        if (page === 1) {
          // Se for a primeira página, substituir a lista de filmes
          setFilms(newFilms);
        } else {
          // Caso contrário, adicionar os filmes à lista existente
          setFilms((prevFilms) => [...prevFilms, ...newFilms]);
        }

        setLoading(false); // Indicar que o carregamento foi concluído
      })
      .catch((err) => console.error(err));
  }
  function loadMore() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${search}&page=${page}&language=pt-BR`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUxM2VhMDAxZDUyMTNkYjExMWQ4OTI5M2E0YjIyNCIsInN1YiI6IjY0NWNmZDFlMWI3MGFlMDBmZDZkNWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZUoMEgF3X1GkXtbYo8Y4kxSyQuNYBlL6f28bUM23Rk",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        films.length == 0
          ? setFilms(response.results)
          : setFilms([...films, ...response.results]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }
  const addFilm = async (filmId) => {
    try {
      const uid = localStorage.getItem("uid");
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const likedFilms = doc.data().likedFilms || [];
        if (likedFilms.includes(filmId)) {
          await updateDoc(doc.ref, {
            likedFilms: arrayRemove(filmId),
          });
        } else {
          await updateDoc(doc.ref, {
            likedFilms: arrayUnion(filmId),
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const listFilm = async (filmId) => {
    try {
      const uid = localStorage.getItem("uid");
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const listFilms = doc.data().listFilms || [];
        if (listFilms.includes(filmId)) {
          await updateDoc(doc.ref, {
            listFilms: arrayRemove(filmId),
          });
        } else {
          await updateDoc(doc.ref, {
            listFilms: arrayUnion(filmId),
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    console.log(filters);
    if (search === "") {
      getFilms();
    } else {
      loadMore();
    }
  }, [page, search, filters]);
  useEffect(() => {
    setPage(1);
  }, [filters]);
  return (
    <Fragment>
      <main className="font-mont w-screen h-screen bg-[#161616] flex">
        <LateralMenu homepage={true}></LateralMenu>
        <div className="flex flex-col h-screen w-full p-6">
          <TopMenu homepage={true}></TopMenu>
          <div className="flex w-full h-fit">
            <div className="flex items-center gap-2 w-full p-4 h-12 border-[#252525] border rounded-md hover:border-[#757575] transition-all">
              <AiOutlineSearch className="text-[#A1A1A1]"></AiOutlineSearch>
              <input
                className="font-mont bg-transparent w-full focus:outline-none text-white"
                placeholder="Buscar por nome do filme"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                  setFilms([]);
                }}
              ></input>
              <div className="flex relative">
                <AiOutlineUnorderedList
                  onClick={() =>
                    openFilters ? setOpenFilters(false) : setOpenFilters(true)
                  }
                  className="text-[#A1A1A1] cursor-pointer active:scale-90 transition-all hover:text-[#cdcdcd]"
                ></AiOutlineUnorderedList>
                {openFilters ? (
                  <Filter
                    onVisibilityClick={() => {
                      setOpenFilters(false);
                    }}
                    filtersApplied={(filtros) => {
                      setFilters(filtros);
                    }}
                  ></Filter>
                ) : (
                  false
                )}
              </div>
            </div>
            <div className="h-12 w-12 flex items-center justify-center">
              <MdAccountCircle className="text-[#A1A1A1]"></MdAccountCircle>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col w-full h-full items-center justify-center gap-2">
              <p className="text-[#A1A1A1] text-2xl">Carregando...</p>
              <Loading></Loading>
            </div>
          ) : (
            <div className="flex w-full h-full mt-4 overflow-y-auto flex-col">
              {films.length == 0 ? (
                <div className="flex flex-col w-full h-full items-center justify-center gap-2">
                  <p className="text-[#A1A1A1] text-2xl text-center w-full mt-10">
                    Nenhum filme encontrado
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 flex-wrap">
                  {films.map((film) => {
                    return (
                      <FilmCard
                        title={film.title}
                        image={film.poster_path}
                        rate={film.vote_average}
                        id={film.id}
                        onVisibilityClick={() => {
                          setOpenFilmDetails(true);
                          setSelectedFilm(film);
                        }}
                        onLikeClick={() => {
                          addFilm(film.id);
                        }}
                        onListClick={() => {
                          listFilm(film.id);
                        }}
                      ></FilmCard>
                    );
                  })}
                  {openFilmDetails ? (
                    <Modal
                      id={selectedFilm.id}
                      onVisibilityClick={() => {
                        setOpenFilmDetails(false);
                      }}
                    />
                  ) : (
                    false
                  )}
                </div>
              )}
              <div
                onClick={() => setPage(page + 1)}
                className="w-full flex items-center justify-center"
              >
                {films.length == 0 || films.length < 18 ? (
                  false
                ) : (
                  <PrimaryButton>Ver mais</PrimaryButton>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
}
