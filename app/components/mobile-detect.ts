import { headers } from "next/headers";
import MobileDetect from "mobile-detect";

const getIsSsrMobile = () => {
  const headersList = headers();
  const md = new MobileDetect(headersList.get("user-agent")!);
  return Boolean(md.mobile());
};

export default getIsSsrMobile;
