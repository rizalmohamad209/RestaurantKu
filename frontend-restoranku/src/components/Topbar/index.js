import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Responsive, ButtonCircle } from "upkit";
import FaUser from "@meronex/icons/fa/FaUser";

export default function Topbar() {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <Responsive desktop={2} justify="between" items="center">
        <div>Restoranku</div>

        <div className="mr-5 text-right">
          <Link to={auth?.user ? "/akun" : "/signin"}>
            <div className="mr-2 inline-block text-red-600 font-bold">
              {auth?.user?.username}
              <ButtonCircle icon={<FaUser />} />
            </div>
          </Link>
        </div>
      </Responsive>
    </div>
  );
}
