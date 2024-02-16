import BottomNavContainer from "./BottomNavContainer";
import UserChat from "../Chat/ChatsPanel";
import UserProfile from "../Navbar/UserProfile";
import ButtonContainer from "./ButtonContainer";
import NavButton from "./NavButton";
import PlusBottomContainer from "./PlusBottomContainer";

import CategoriesDrawer from "./CategoriesDrawer";

const BottomNav = () => {
  return (
    <BottomNavContainer>
      <ButtonContainer>
        <UserChat>
          <NavButton className="mt-3">
            <svg
              className="w-8  fill-[#4B5563] dark:fill-gray-500"
              viewBox="0 0 16 16"
            >
              <path d="m 6.6312013,0.0081728 c -4.4189192,0 -4.6555293,0.00271 -4.7971137,0.033203 -0.87742244,0.1889619 -1.55358294,0.9103611 -1.76481294,1.8828126 -0.066535,0.3063121 -0.071724,0.5594235 -0.06562,3.2792968 0.00629,2.8023458 0.00225,2.6580757 0.1087899,3.0371098 0.242768,0.863674 0.8450863,1.480167 1.65947674,1.699218 0.1095015,0.02946 0.2742242,0.03201 2.3985568,0.03711 l 2.2811328,0.0059 1.2933902,1.460938 c 0.7113043,0.803367 1.3158583,1.473604 1.3451943,1.490234 0.02933,0.01663 0.08643,0.03627 0.126059,0.04297 0.146832,0.02487 0.281309,-0.03249 0.388534,-0.164063 0.117003,-0.143612 0.113972,-0.10123 0.113972,-1.546875 v -1.28125 l 0.8271466,-0.0078 c 0.717301,-0.0059 0.842586,-0.01025 0.944573,-0.03711 0.916413,-0.241363 1.55875,-0.993609 1.733729,-2.0312496 0.02642,-0.15668 0.02941,-0.346633 0.03453,-2.7050782 0.006,-2.7195568 8.84e-4,-2.973147 -0.06562,-3.2792968 C 12.981893,0.951721 12.30575,0.2303407 11.428314,0.0413759 11.286729,0.0108839 11.05012,0.0081728 6.6312013,0.0081728 Z" />
            </svg>
          </NavButton>
        </UserChat>
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
