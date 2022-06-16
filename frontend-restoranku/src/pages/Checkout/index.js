import React from "react";
import { LayoutOne, Steps, Text, Table, Button } from "upkit";
import { useAddressData } from "../../hooks/address";
import TopBar from "../../components/Topbar";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import FaAddressCard from "@meronex/icons/fa/FaAddressCard";
import FaInfoCircle from "@meronex/icons/fa/FaInfoCircle";
import FaArrowLeft from "@meronex/icons/fa/FaArrowLeft";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import { config } from "../../config/config";
import { createOrder } from '../../api/order'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { clearItem } from '../../features/Carts/actions'

const IconWrapper = ({ children }) => {
  return <div className="text-3xl flex justify-center">{children}</div>;
};

const Columns = [
  {
    Header: "Nama Produk",
    accessor: (item) => (
      <div className="flex items-center">
        <img src={item.image} alt={item.name_products} width="48" />
        {item.name_products}
      </div>
    ),
  },
  {
    Header: "Jumlah",
    accessor: "qty",
  },
  {
    Header: "Harga Satuan",
    id: "price",
    accessor: (item) => <span>{item.price}</span>,
  },
  {
    Header: "Harga Total",
    id: "subtotal",
    accessor: (item) => {
      return <div>{item.price * item.qty}</div>;
    },
  },
];
const steps = [
  {
    label: "Item",
    icon: (
      <IconWrapper>
        <FaCartPlus />
      </IconWrapper>
    ),
  },
  {
    label: "Alamat",
    icon: (
      <IconWrapper>
        <FaAddressCard />
      </IconWrapper>
    ),
  },
  {
    label: "Konfirmasi",
    icon: (
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
    ),
  },
];

export default function Checkout() {
  let dispatch = useDispatch();

  let [selectedAddress, setSelectedAddress] = React.useState(null);
  // console.log(selectedAddress.nama_alamat);
  let carts = useSelector((state) => state.carts);
  let subTotal = carts.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let [activeStep, setActiveStep] = React.useState(0);

  const Columnss = [
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

  let history = useHistory();
  async function handleCreateOrder() {
    let payload = {
      ongkir: config.global_ongkir,
      address_id: selectedAddress.id
    }

    let { data } = await createOrder(payload)
    console.log(data);

    if (data?.error) return;
    history.push(`/invoices/${data.data.id}`)
    dispatch(clearItem());
  }

  let { data, status } = useAddressData();
  return (
    <div>
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Checkout</Text>
        <Steps
          steps={steps}
          active={activeStep}
          onChange={(steps) => setActiveStep(steps)}
        />
        <br /> <br />
        {activeStep === 0 ? (
          <div>
            <Table
              items={carts}
              color="blue"
              columns={Columns}
              perPage={carts.length}
              showPagination={false}
            />
            <div className="text-right">
              <Text as="h4">Subtotal: {subTotal}</Text>

              <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="gray"
                disabled={true}
                iconBefore={<FaArrowLeft />}
              >
                {" "}
                Sebelumnya
              </Button>
              <Button
                onClick={(_) => setActiveStep(activeStep + 1)}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                {" "}
                Selanjutnya{" "}
              </Button>
            </div>
          </div>
        ) : null}
        {activeStep === 1 ? (
          <div>
            <Table
              items={data}
              columns={Columnss}
              primaryKey={"id"}
              isLoading={status === "process"}
              color="blue"
              selectable={true}
              selectedRow={selectedAddress}
              primaryField={"nama_alamat"}
              onSelectRow={(item) => setSelectedAddress(item)}
              showPagination={false}
            />
            <div className="text-right">
              <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="gray"
                iconAfter={<FaArrowLeft />}
              >
                {" "}
                Sebelumnya
              </Button>
              <Button
                onClick={(_) => setActiveStep(activeStep + 1)}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                {" "}
                Selanjutnya{" "}
              </Button>
            </div>
          </div>
        ) : null}
        {activeStep === 2 ? (
          <div>
            <Table
              columns={[
                {
                  Header: "",
                  accessor: "label",
                },
                {
                  Header: "",
                  accessor: "value",
                },
              ]}
              items={[
                {
                  label: "Alamat",
                  value:
                    <div>
                      {selectedAddress.nama_alamat} <br />
                      {selectedAddress.provinsi}, {selectedAddress.kabupaten},
                      {selectedAddress.kecamatan}, {selectedAddress.kelurahan}{" "}
                      <br />
                      {selectedAddress.detail_pengiriman}
                    </div>
                  ,
                },
                {
                  label: "Subtotal",
                  value: <div>Rp {subTotal}</div>
                },
                {
                  label: "Ongkir",
                  value: <div>Rp {config.global_ongkir}</div>
                }, {
                  label: "Total",
                  value: <div>Rp {subTotal + config.global_ongkir}</div>
                }
              ]}
              showPagination={false}
            />
            <div className="text-right">
              <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                {" "}
                Sebelumnya
              </Button>
              <Button
                onClick={handleCreateOrder}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                {" "}
                Bayar
              </Button>
            </div>
          </div>
        ) : null}
      </LayoutOne>
    </div>
  );
}
