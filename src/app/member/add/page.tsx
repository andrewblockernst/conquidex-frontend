"use client";

import { useUser } from "@/contexts/UserContext";
import PersonForm from "@/components/forms/person-form";
import { useRouter } from "next/navigation";

export default function MemberAdd() {
    const { activeProfile } = useUser();
    const router = useRouter();
    if (activeProfile?.role_id === 0 || activeProfile?.role_id === 1) {
        router.push('/home');
    }
    return(
    <div className="w-full h-full p-4">
        <PersonForm></PersonForm>
    </div>
    )

}