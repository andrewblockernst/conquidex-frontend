import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import PersonCrudModal from "@/components/person/CRUD/person-CRUD-modal";

const ToolsBar: React.FC = () => {
  const { activeProfile, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const buttons = [
    { label: "INICIO", link: "/home" },
    { label: "ASISTENCIA" },
    { label: "CREAR", onClick: () => setIsModalOpen(true) },
    { label: "INFO CLUB" },
  ];

  const filteredButtons =
    activeProfile?.role_id === 0 || activeProfile?.role_id === 1
      ? buttons.filter(
          (button) => button.label === "INICIO" || button.label === "INFO CLUB"
        )
      : buttons;

  return (
    <>
      <aside className="fixed flex-col space-y-6 pt-24 hidden md:flex">
        {filteredButtons.map((button, index) =>
          button.link ? (
            <Link
              key={index}
              href={button.link}
              className="flex justify-center items-center gap-2 p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] text-white font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100"
            >
              <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 group-hover:w-full z-0"></span>
              <span className="relative z-10">{button.label}</span>
            </Link>
          ) : (
            <button
              key={index}
              type="button"
              onClick={button.onClick}
              className="flex justify-center items-center gap-2 p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] text-white font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100"
            >
              <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 group-hover:w-full z-0"></span>
              <span className="relative z-10">{button.label}</span>
            </button>
          )
        )}
      </aside>
      <PersonCrudModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ToolsBar;