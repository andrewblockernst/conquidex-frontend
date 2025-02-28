"use client";

import { useUser } from "@/contexts/UserContext";
import UnitForm from "@/components/forms/unit-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/buttons/button";
import { MoveLeft } from "lucide-react";

export default function UnitAdd() {
    const { activeProfile } = useUser();
    const router = useRouter();
    if (activeProfile?.role_id === 0 || activeProfile?.role_id === 1) {
        router.push('/home');
    }
    return(
    <div className="w-full h-full relative p-4 space-y-2">
        <div className="absolute left-4 top-4 z-10">
        <Link href={`/home`}>
            <Button>
            <MoveLeft size={32} />
            </Button>
        </Link>
        </div>
        <h1 className="text-xl font-bold text-center">Nueva unidad</h1>
        <div className="pt-8">
            <UnitForm></UnitForm>
        </div>
    </div>
    )

}