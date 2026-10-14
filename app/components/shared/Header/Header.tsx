import Image from "next/image";
import { Suspense } from "react";
import NavLink from "./NavLink";
import HeaderDate from "./HeaderDate";

import UserInfo from "../../userInfo/UserInfo";

const Header = () => {
  return (
    <div className="container mx-auto">
      {" "}
      <div className="flex justify-between items-center px-5">
        {" "}
        <div className="flex justify-center gap-5 items-center mt-5">
          {" "}
          <Image src="/logo.webp" alt="logo" width={60} height={60} />
          <div>
            <h2 className="font-bold text-2xl">Bangla News 24</h2>

            <Suspense fallback={<p>তারিখ লোড হচ্ছে...</p>}>
              <HeaderDate />
            </Suspense>
          </div>
        </div>
        <UserInfo/>
      </div>
      <NavLink />
    </div>
  );
};

export default Header;
