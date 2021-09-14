import React from "react";
import { useAddressData } from "../../hooks/address";
import { LayoutOne, Text, Table, Button } from "upkit";
import TopBar from "../../components/Topbar";
import { Link } from "react-router-dom";
export default function UserAddress() {
  const Columns = [
    { Header: "Nama", accessor: "nama_alamat" },
    {
      Header: "Detail",
      accessor: (alamat) => {
        return (
          <div>
            {alamat.provinsi},{alamat.kabupaten},{alamat.kecamatan},
            {alamat.kelurahan} <br />
            {alamat.detail_pengiriman}
          </div>
        );
      },
    },
  ];
  let { data, status } = useAddressData();
  return (
    <div>
      <LayoutOne size="large">
        <TopBar />
        <Text as="h2"> Alamat Pengiriman</Text>
        <br />
        <div>
          <Link to="address/addAddress">
            <Button color="blue">Tambah Baru</Button>
          </Link>
          <Table
            color="blue"
            items={data}
            columns={Columns}
            showPagination={false}
            isLoading={status === "process"}
          ></Table>
          {status === "success" && !data.length ? (
            <div className="text-center p-10">
              Kamu Belum Menambahkan alamat Pengiriman. <br />
              <Link to="address/addAddress">
                <Button>Tambah alamat</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </LayoutOne>
    </div>
  );
}
