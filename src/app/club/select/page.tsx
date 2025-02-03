import ClubTableServer from "@/components/clubs-table/clubs-table-server";
import React from "react";
import { AuthButton} from "../../../components";
import { Header } from "@/components/header/header";

export default function ClubSelect() {
    return (
    <>
        <Header/>
        <div className="flex flex-col items-center">
            <h1 className="text-center m-10">CLUBES</h1>
            <ClubTableServer />
            <AuthButton />
        </div>
    </>
    );
}