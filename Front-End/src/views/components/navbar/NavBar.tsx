import { Avatar, Button, Card } from "@/components/ui";
import { getUser } from "@/utils/CommonFunction/Common";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [signout, setSignOut] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="h-16 flex justify-center"
      style={{ backgroundColor: "#1b3fb0" }}
    >
      <div className="w-full max-w-screen-lg flex items-center justify-between mx-auto">
        <Link to="/">
          <span
            className="text-white font-semibold"
            style={{ fontSize: "20px" }}
          >
            Apna Booking.com
          </span>
        </Link>
        <div className="relative">
          {" "}
          {getUser()?.email ? (
            <>
              <div className="text-white flex flex-col items-center cursor-pointer">
                <div className="flex items-center ">
                  {" "}
                  {/* Ensure consistent vertical alignment */}
                  <Avatar
                    className="mr-4 h-8 w-8 "
                    src="/img/avatars/thumb-4.jpg"
                    onClick={() => setSignOut(!signout)}
                  />
                  <h5 className="mt-0 mb-0 flex items-center">
                    {getUser().username}
                  </h5>
                </div>
                {signout && (
                  <Card
                    className="text-white mt-2 w-24 h-6 text-black absolute"
                    style={{ top: "100%", backgroundColor: "#c49581" }}
                  >
                    <span
                      onClick={() => {
                        localStorage.removeItem("userDetails");
                        window.location.reload();
                      }}
                      className=" flex justify-center items-center"
                    >
                      <b>Sign Out</b>
                    </span>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <div>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                size="sm"
                className="ml-4"
                style={{ color: "#003580" }}
              >
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                size="sm"
                className="ml-4"
                style={{ color: "#003580" }}
              >
                Sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
