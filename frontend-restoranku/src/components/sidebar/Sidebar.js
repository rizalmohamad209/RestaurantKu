import React, { useState } from "react";
import { SideNav, LayoutSidebar } from "upkit";

import { FaHome, FaCartPlus } from "@meronex/icons/fa";

let items = [
  { icon: <FaHome />, label: "Semua", id: "semua" },
  {
    icon: "https://fastfood.now.sh/assets/icons/chicken.png",
    label: "Utama",
    id: "utama",
  },
  {
    icon: "https://fastfood.now.sh/assets/icons/drink.png",
    label: "Drink",
    id: "drink",
  },
  {
    icon: "https://fastfood.now.sh/assets/icons/fries.png",
    label: "Snack",
    id: "snack",
  },
];

export default function Sidebar() {
  let [active, setActive] = useState("semua");
  return (
    <div>
      <div style={{ height: "100%" }}>
        <LayoutSidebar
          sidebar={
            <SideNav
              items={items}
              onChange={(id) => setActive(id)}
              color="blue"
              active={active}
              verticalAlign="top"
            />
          }
          content={
            <div className="md:flex w-full mr-5 h-full md:flex-row-reverse min-h-screen">
              <div className="w-full md:w-3/4 pl-5 pb-10">
                <div className="p-8">
                  <div className="bg-white md:w-1/3 flex items-center rounded-full shadow-lg">
                    <input
                      className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                      id="search"
                      type="text"
                      placeholder="Search"
                    />
                    <div className="p-4"></div>
                  </div>
                </div>
                <section className="text-gray-600 body-font">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4">
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/420x260"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            The Catalyzer
                          </h2>
                          <p className="mt-1">$16.00</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/421x261"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            Shooting Stars
                          </h2>
                          <p className="mt-1">$21.15</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/422x262"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            Neptune
                          </h2>
                          <p className="mt-1">$12.00</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/423x263"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            The 400 Blows
                          </h2>
                          <p className="mt-1">$18.40</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/424x264"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            The Catalyzer
                          </h2>
                          <p className="mt-1">$16.00</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/425x265"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            Shooting Stars
                          </h2>
                          <p className="mt-1">$21.15</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/427x267"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            Neptune
                          </h2>
                          <p className="mt-1">$12.00</p>
                        </div>
                      </div>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/428x268"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            CATEGORY
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            The 400 Blows
                          </h2>
                          <p className="mt-1">$18.40</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                <div className="flex mt-5">
                  <FaCartPlus
                    style={{ width: "5em", height: "5em", padding: "10px" }}
                  />
                  <h2 className="pt-5 text-3xl">Keranjang</h2>
                </div>

                <h2 className="pl-5">Total: Rp 0</h2>
                <button className="bg-blue-500 text-white md:w-11/12 hover:bg-blue-400 focus:outline-none p-2 ml-4 flex items-center justify-center">
                  Checkout
                </button>
              </div>
            </div>
          }
          sidebarSize={80}
        />
      </div>
    </div>
  );
}
