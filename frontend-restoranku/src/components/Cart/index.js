import { arrayOf, string, shape, oneOfType, number, func } from "prop-types";
import { CardItem, Button } from "upkit";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ items, onItemInc, onItemDec }) {
  console.log("====================================");
  console.log("ini items", items);
  console.log("====================================");
  return (
    <div>
      <Link to="/checkout">
        <div className="px-2 pb-2">
          <Button
            color="blue"
            text="Checkout"
            fitContainer
            iconAfter={<FaArrowRight />}
            disabled={!items.length}
          />
        </div>
      </Link>
      {!items.length ? (
        <div className="text-center text-sm text-red-900">
          {" "}
          belum ada items di keranjang{" "}
        </div>
      ) : null}
      {items.map((item, index) => {
        return (
          <div key={index} className="mb-2 px-2 pb-2">
            <CardItem
              imgUrl={item.image}
              name={item.name_products}
              qty={item.qty}
              onInc={(_) => onItemInc(item)}
              onDec={(_) => onItemDec(item)}
              color="blue"
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
