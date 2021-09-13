import React from "react";
import { useAddressData } from "../../hooks/address";
import { LayoutOne, Text, Table, Button } from "upkit";
import TopBar from "../../components/Topbar";
import { Link } from "react-router-dom";
export default function UserAddress() {
  let { data, status } = useAddressData();
  return <div>{JSON.stringify(data)}</div>;
}
