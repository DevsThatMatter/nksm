import BottomNavContainer from "./BottomNavContainer";
import UserChat from "../Chat/chat-panel";
import UserProfile from "../Navbar/UserProfile";
import ButtonContainer from "./ButtonContainer";
import NavButton from "./NavButton";
import PlusBottomContainer from "./PlusBottomContainer";

import CategoriesDrawer from "./CategoriesDrawer";

const BottomNav = async () => {
  return (
    <BottomNavContainer>
      <ButtonContainer>
        <UserChat />
        <CategoriesDrawer>
          <NavButton>
            <svg
              className="w-8 fill-[#4B5563] dark:fill-gray-500"
              viewBox="0 0 24 24"
            >
              <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4z"></path>
            </svg>
          </NavButton>
        </CategoriesDrawer>
      </ButtonContainer>
      <PlusBottomContainer />
      <ButtonContainer variant={"right"}>
        <NavButton>
          <svg
            className="w-8 fill-[#4B5563] dark:fill-gray-500"
            viewBox="0 0 24 24"
          >
            <path d="M6 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v13.131a1 1 0 0 1-1.555.832l-3.89-2.593a1 1 0 0 0-1.11 0l-3.89 2.593A1 1 0 0 1 6 18.131V5Z"></path>
          </svg>
        </NavButton>
        <UserProfile whichIcon={true} />
      </ButtonContainer>
    </BottomNavContainer>
  );
};
export default BottomNav;
