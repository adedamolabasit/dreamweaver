import { useEffect, useState } from "react";
import DreamyBackground from "../Background/DreamyBackground";
import Navigation from "./Navigation";
import { FC, HtmlHTMLAttributes, PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>;

export const DashboardLayout: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveSection(path || "journal");
  }, [location]);

  useEffect(() => {
    if (activeSection && location.pathname !== `/${activeSection}`) {
      navigate(`/${activeSection}`);
    }
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-hidden font-serif text-white">
      <DreamyBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 px-4 py-6 mt-28 md:p-8">{children}</main>

        <div className="fixed top-0 w-full flex justify-center">
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
};
