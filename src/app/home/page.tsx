// src/app/home/page.tsx
import { Header } from "@/components/header/header";
import ClubView from "@/components/club-view/club-view";
import { AuthButton } from "@/components/buttons/auth-button";

export default function Home() {
    return (<>
        <Header/>
        <ClubView/>
        <div className="mt-8 w-full max-w-xs">
            <AuthButton />
        </div>
    </>
    );
}