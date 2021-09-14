import React from "react";
import { LayoutOne, Steps, Text, Table, Button } from "upkit";
import {useAddressData} from '../../hooks/address'
import TopBar from "../../components/Topbar";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import FaAddressCard from "@meronex/icons/fa/FaAddressCard";
import FaInfoCircle from "@meronex/icons/fa/FaInfoCircle";
import FaArrowLeft from "@meronex/icons/fa/FaArrowLeft";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import { useSelector } from "react-redux";

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
  
  let [selectedAddress, setSelectedAddress] = React.useState(null);
  let carts = useSelector((state) => state.carts);
  let subTotal = carts.reduce((total, item) => total + (item.qty * item.price),0);
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

  let { data, status } = useAddressData();
  return (
    <div>
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Checkout</Text>
        <Steps steps={steps} active={activeStep} />
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
          primaryKey={'id'}
          isLoading={status === 'process'}
          color="blue"
          selectable={true}
          selectedRow={selectedAddress}
          primaryField={'nama_alamat'}
          onSelectRow={item => setSelectedAddress(item)}
          showPagination={false}
          />
          <div className="text-right">
          <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="red"
                iconAfter={<FaArrowLeft />}
              > Sebelumnya</Button>
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
              ): null}
      </LayoutOne>
    </div>
  );
}
