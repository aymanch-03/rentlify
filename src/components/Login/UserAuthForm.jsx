/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import {LoginUser} from "../../redux/reducers/userReducers";

function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    user_name: "",
    password: "" ,
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    dispatch(LoginUser(user)).then((result)=>{
      if(result.payload){
        setUser('');
        navigate("/products");
      }
    })
  };

  return (
    <div className={`grid gap-6  ${className}`} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-sm font-light " htmlFor="user_name">
              Username
            </Label>
            <Input
              className="placeholder:text-black/30 text-sm px-3 py-5"
              id="username"
              name="user_name"
              placeholder="ex: johndoe123"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-sm font-light" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              className="placeholder:text-black/30 text-sm px-3 py-5"
              name="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
            <a
              href=""
              className="underline text-sm text-right hover:text-black text-black/80 transition-all"
            >
              Forgot Password?
            </a>
          </div>
          <Button disabled={isLoading} className="mt-6 py-5 text-base">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export { UserAuthForm };
