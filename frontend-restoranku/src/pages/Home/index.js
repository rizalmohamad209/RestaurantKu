import React, { useEffect } from "react";
import menus from "./menus";
import { tags } from "./tags";
import Cart from "../../components/Cart";
import Topbar from "../../components/Topbar";
import { useHistory } from "react-router-dom";

import { getCart } from "../../api/cart";

import { FaCartPlus } from "@meronex/icons/fa";
import {
  fetchingProducts,
  setKeyword,
  setCategory,
  toggleTag,
  startFetchingProducts,
} from "../../features/Products/actions";
import { addItem, removeItem } from "../../features/Carts/actions";
import BounceLoader from "react-spinners/BounceLoader";

import { SideNav, LayoutSidebar, Responsive, CardProduct, Pill } from "upkit";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const history = useHistory();
  let dispatch = useDispatch();

  let products = useSelector((state) => state.products);
  let cart = useSelector((state) => state.carts);
  useEffect(() => {
    getCart();
    dispatch(fetchingProducts());
    dispatch(startFetchingProducts());
  }, [dispatch, products.keyword, products.categori, products.tagsi]);

  const totalBelanja = cart.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);

  console.log("====================================");
  console.log(totalBelanja);
  console.log("====================================");

  // console.log("====================================");
  // console.log(carts);
  // console.log("====================================");
  console.log("====================================");
  console.log("ini state cart", cart);
  console.log("====================================");

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="top"
            color="blue"
            active={products.categori}
            onChange={(id) => dispatch(setCategory(id))}
          />
        }
        content={
          <div className="md:flex w-full mr-5 h-full md:flex-row-reverse min-h-screen ">
            <div className="w-full md:w-3/4 pl-5 pb-10">
              <Topbar />
              <div className="p-8">
                <div className="bg-white md:w-1/3 flex items-center rounded-full shadow-lg">
                  <input
                    className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                    id="search"
                    type="text"
                    value={products.keyword}
                    placeholder="Search"
                    onChange={(e) => dispatch(setKeyword(e.target.value))}
                  />
                  <div className="p-4"></div>
                </div>
              </div>

              <div className="flex-wrap">
                {tags[products.categori].map((tag, index) => {
                  return (
                    <Pill
                      className="flex"
                      key={index}
                      text={tag}
                      icon={tag.slice(0, 1).toUpperCase()}
                      isActive={products.tagsi.includes(tag)}
                      onClick={(_) => dispatch(toggleTag(tag))}
                    />
                  );
                })}
              </div>
              {products.status === "process" && !products.data.length ? (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              ) : null}
              <Responsive desktop={3} items="stretch">
                {products.data.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      <CardProduct
                        color="blue"
                        title={product.name_products}
                        price={product.price}
                        imgUrl={product.image}
                        onAddToCart={(_) => dispatch(addItem(product))}
                      />
                    </div>
                  );
                })}
              </Responsive>
            </div>

            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
              <div className="flex mt-5">
                <FaCartPlus
                  style={{ width: "5em", height: "5em", padding: "10px" }}
                />
                <h2 className="pt-5 text-3xl">Keranjang</h2>
              </div>

              <h2 className="pl-5">Total: Rp{totalBelanja} </h2>

              <Cart
                items={cart}
                onItemDec={(item) => dispatch(removeItem(item))}
                onItemInc={(item) => dispatch(addItem(item))}
                onCheckout={(_) => history.push("/checkout")}
              />
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}
