import Navbar from "@/app/components/Navbar";
import getIsSsrMobile from "../components/mobile-detect";
import BottomNav from "../components/BottomNav";
import NavButton from "../components/BottomNav/NavButton";
import ButtonContainer from "../components/BottomNav/ButtonContainer";
import FloatBottomContainer from "../components/BottomNav/FloatBottomContainer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const mobnav = getIsSsrMobile();
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      {mobnav ? (
        <BottomNav>
          <ButtonContainer>
            <NavButton>
              <svg className="w-8" viewBox="0 0 24 24">
                <path
                  d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavButton>
            <NavButton>
              <svg className="w-8" viewBox="0 0 24 24">
                <path
                  d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavButton>
          </ButtonContainer>
          <FloatBottomContainer />
          <ButtonContainer variant={"right"}>
            <NavButton>
              <svg className="w-8" viewBox="0 0 24 24">
                <path
                  d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavButton>
            <NavButton>
              <svg className="w-8 p-1" viewBox="0 0 1024 1025">
                <path
                  d="M1024 958q0 12-13.5 22T969 996.5t-57.5 12t-75.5 8.5t-80 4.5t-87.5 2.5t-81 1h-151l-81-1l-87.5-2.5l-80-4.5l-75.5-8.5l-57.5-12L13.5 980L0 958q2-88 110-155.5T384 713v-33q-52-23-90-65t-60-98.5t-32-121T192 256q0-64 25-114t69-80.5t101-46T512 0t125 15.5t101 46t69 80.5t25 114q0 350-192 426v31q166 22 274 89.5T1024 958z"
                  fill="currentColor"
                ></path>
              </svg>
            </NavButton>
          </ButtonContainer>
        </BottomNav>
      ) : (
        ""
      )}
    </main>
  );
};
export default Layout;
