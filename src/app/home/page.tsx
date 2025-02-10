// src/app/home/page.tsx
import { Header } from "@/components/header/header";
import ClubView from "@/components/club/club-view/club-view";
import { AuthButton } from "@/components/buttons/auth-button";

export default function Home() {
  return (
    <>
      <Header />
      <ClubView />
    </>
  );
}
