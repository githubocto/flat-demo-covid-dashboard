import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { useRouter } from "next/router";
import data from "./../data.json";
import { StateDataType } from "./../interfaces";

const states = (data as StateDataType[]).map((d) => d["name"]).sort();

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "COVID Dashboard" }: Props) => {
  const router = useRouter();
  const selectedState = router.query.slug;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header></header>

      <div className="flex">
        <div className="flex-none flex flex-col items-start p-6 overflow-auto mt-6">
          {states.map((state) => (
            <Link key={state} href={`/state/${kebabCase(state)}`}>
              <a
                className={`block w-full text-left py-1 px-4 ${
                  kebabCase(state) === selectedState ? "bg-indigo-50" : ""
                }`}
              >
                {state}
              </a>
            </Link>
          ))}
        </div>
        <section className="mt-8 mb-24">{children}</section>
      </div>
      <footer></footer>
    </div>
  );
};

export default Layout;
