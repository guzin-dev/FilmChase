import React, { useEffect, useState } from "react";
import { db } from "../auth/firebase.js";

import { AiFillStar, AiOutlineUnorderedList, AiOutlineEye } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function FilmCard(props) {
  const [filmIsLiked, setFilmIsLiked] = useState(false);
  const [filmIsListed, setFilmIsListed] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFilms = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let isLiked = false;
      let isListed = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().likedFilms?.includes(props.id)) {
          isLiked = true;
        }
        if (doc.data().listFilms?.includes(props.id)) {
          isListed = true;
        }
      });
      setFilmIsLiked(isLiked);
      setFilmIsListed(isListed);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "users"),
        where("uid", "==", localStorage.getItem("uid"))
      ),
      () => {
        getFilms();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleVisibilityClick = () => {
    props.onVisibilityClick();
  };

  const handleLikeClick = async () => {
    props.onLikeClick();
  };

  const handleListClick = async () => {
    props.onListClick();
  };

  return (
    <main className="font-mont">
      {loading ? (
        false
      ) : (
        <div className="bg-[#1C1C1C] w-56 h-72 rounded-2xl">
          <div className="relative flex flex-col">
            {props.image ? (
              <img
                className="h-40 rounded-t-2xl w-full object-cover"
                src={"https://image.tmdb.org/t/p/w500/" + props.image}
              />
            ) : (
              <img
                className="h-40 rounded-t-2xl w-full object-cover"
                src="noPhoto.png"
              />
            )}
            <div className="absolute top-36 w-full items-center flex justify-center">
              <div className="w-fit px-3 bg-[#161616] h-10 rounded-md flex items-center">
                <span className="text-center text-white">{props.title}</span>
              </div>
            </div>
            <div className="flex gap-3 w-full h-12 mt-8 items-center justify-center">
              {filmIsListed ? (
                <AiOutlineUnorderedList
                  onClick={handleListClick}
                  className="hover:text-[#A1A1A1] cursor-pointer text-green-700 transition-all active:scale-90"
                />
              ) : (
                <AiOutlineUnorderedList
                  onClick={handleListClick}
                  className="text-[#A1A1A1] cursor-pointer hover:text-green-700 transition-all active:scale-90"
                />
              )}
              {filmIsLiked ? (
                <MdFavorite
                  onClick={handleLikeClick}
                  className="cursor-pointer hover:text-[#A1A1A1] text-red-700 transition-all active:scale-90"
                />
              ) : (
                <MdFavorite
                  onClick={handleLikeClick}
                  className="text-[#A1A1A1] cursor-pointer hover:text-red-700 transition-all active:scale-90"
                />
              )}
              <AiOutlineEye
                className="text-[#A1A1A1] cursor-pointer hover:text-white active:scale-90 transition-all"
                onClick={handleVisibilityClick}
              />
            </div>
            <div className="flex mt-2 w-full gap-2 items-center justify-center">
              <AiFillStar className="text-[#FFC700]" />
              <span className="text-lg text-[#FFC700]">{props.rate}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
