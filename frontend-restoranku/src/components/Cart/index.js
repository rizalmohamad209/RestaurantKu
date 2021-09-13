import { arrayOf, string, shape, oneOfType, number, func } from "prop-types";
import { CardItem, Button } from "upkit";

import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import React from "react";
import { deleteCart } from "../../api/cart";

export default function Cart({ items, onItemInc, onItemDec }) {
  console.log("====================================");
  console.log("ini items", items);
  console.log("====================================");
  return (
    <div>
      <Button
        text="Checkout"
        fitContainer
        iconAfter={<FaArrowRight />}
        disabled={!items.length}
      />
      {!items.length ? (
        <div className="text-center text-sm text-red-900">
          {" "}
          belum ada items di keranjang{" "}
        </div>
      ) : null}
      {items.map((item, index) => {
        return (
          <div key={index} className="mb-2">
            <CardItem
              imgUrl={item.image}
              name={item.name_products}
              qty={item.qty}
              onInc={(_) => onItemInc(item)}
              onDec={(_) => onItemDec(item)}
              color="orange"
            ></CardItem>
          </div>
        );
      })}
    </div>
  );
}
Cart.propTypes = {
  items: arrayOf(
    shape({
      id: number.isRequired,
      name_products: string.isRequired,
      qty: oneOfType([string, number]).isRequired,
    })
  ),
  onItemInc: func,
  onItemDec: func,
};
