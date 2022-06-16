import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Responsive, ButtonCircle } from "upkit";
import FaUser from "@meronex/icons/fa/FaUser";

export default function Topbar() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="mt-5">
      <Responsive desktop={2} justify="between" items="center">
        <Link to="/">
          <div className="text-2xl">RestoranKu</div>
        </Link>

        <div className="mr-5 text-right">
          <Link to={auth?.user ? "/account" : "/signin"}>
            <div className="mr-2 inline-block text-black font-bold">
              {auth?.user?.username}
              <ButtonCircle color="black" icon={<FaUser />} />
            </div>
          </Link>
        </div>
      </Responsive>
    </div>
  );
}
