import React from "react";
import { getAddress } from "../api/address";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
export function useAddressData() {
  let [data, setData] = React.useState([]);
  let [status, setStatus] = React.useState(statusList.idle);

  let fetchAddress = React.useCallback(async function () {
    setStatus(statusList.process);
    let {
      data: { data, error },
    } = await getAddress();

    if (error) {
      setStatus(statusList.error);
      return;
    }

    setStatus(statusList.success);
    setData(data);
  }, []);

  React.useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);
  return {
    data,
    status,
  };
}
