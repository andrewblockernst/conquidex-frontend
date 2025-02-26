import ClubTableServer from "@/components/club/clubs-table/clubs-table-server";
import React from "react";
import { AuthButton } from "../../../components";
import { Header } from "@/components/header/header";

export default function ClubSelect() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-center mt-10 mb-5 text-2xl">CLUBES</h1>
        <ClubTableServer />
      </div>
    </>
  );
}
