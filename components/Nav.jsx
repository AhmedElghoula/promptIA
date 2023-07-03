"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {TbPrompt} from "react-icons/tb"
const Nav = () => {
  const { data:session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProvide = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvide();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <TbPrompt
         size={36}
         className=" stroke-primary-orange"
        />
        <p className="logo_text"> PromptIA</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              {" "}
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={35}
                height={35}
                className="rounded-full  border border-primary-orange p-0.5"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full  border border-primary-orange p-0.5"
              onClick={() => setToggleDropDown((prev)=> !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <hr className="mt-2 w-full"/>
                <button type='button' className="mt-2 w-full black_btn"
                onClick={() => {setToggleDropDown(false);signOut();}}>
                      Sign Out
                </button>
              </div>
            )

            }
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
