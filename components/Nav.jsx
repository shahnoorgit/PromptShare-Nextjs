"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [toggle, settoggle] = useState(false);
  const [Providers, setProviders] = useState(null);
  useEffect(() => {
    const setproviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setproviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className=" object-contain"
        />
        <p className="logo_text">PromptShare</p>
      </Link>
      {/*deckstop navigationbar*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign-out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className=" rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign-In
                </button>
              ))}
          </>
        )}
      </div>
      {/*mobile menu*/}
      <div className=" sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className=" object-contain"
              onClick={() => settoggle((prev) => !prev)}
            />
            {toggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggle(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => settoggle(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    settoggle(false);
                  }}
                  className=" mt-5 w-full black_btn"
                >
                  Sign-out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign-In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
