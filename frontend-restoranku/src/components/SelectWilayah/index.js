import React from "react";
import axios from "axios";
import { oneOf, number, oneOfType, string, shape, func } from "prop-types";
import { config } from "../../config/config";
import { Select } from "upkit";

export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
  console.log("=================");
  console.log(tingkat);
  console.log(kodeInduk);
  console.log(value);
  console.log("=================");
  let [data, setData] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);
    axios
      .get(`${config.api_host}/api/wilayah/${tingkat}?kode=${kodeInduk}`)
      .then(({ data }) => setData(data.data))
      .finally((_) => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  console.log("====================================");
  console.log("ini data wilayah", data);
  console.log("====================================");
  return (
    <Select
      options={data.map((wilayah) => ({
        label: wilayah.nama,
        value: wilayah.kode,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
}

SelectWilayah.defaultProps = {
  tingkat: "provinsi",
};

SelectWilayah.propTypes = {
  tingkat: oneOf(["provinsi", "kabupaten", "kecamatan", "kelurahan"]),
  kodeInduk: oneOfType([number, string]),
  onChange: func,
  value: shape({ label: string, value: oneOfType([number, string]) }),
};
