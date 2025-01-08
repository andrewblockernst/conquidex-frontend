import ClubTableServer from "@/components/clubs-table-server";
import React from "react";
import { AuthButtonServer } from "../../../components";

export default function ClubSelect() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center m-10">Club Select</h1>
            <ClubTableServer />
            <AuthButtonServer />
        </div>
    );
}
