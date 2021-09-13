import React from "react";
import { LayoutOne, InputText, FormControl, Textarea, Button } from "upkit";
import SelectWilayah from "../../components/SelectWilayah";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/Topbar";
import { saveAddress } from "../../api/address";

export default function AddAddress() {
  let history = useHistory();

  let {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
    setError,
  } = useForm();

  let allFields = watch();
  React.useEffect(() => {
    setValue("kabupaten", null);
    setValue("kecamatan", null);
    setValue("keluarahan", null);
  }, [allFields.provinsi, setValue]);

  React.useEffect(() => {
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.kabupaten, setValue]);
  React.useEffect(() => {
    setValue("kelurahan", null);
  }, [allFields.kecamatan, setValue]);

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    let payload = {
      nama_alamat: formData.nama_alamat,
      detail_pengiriman: formData.detail_pengiriman,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    };

    // alert(JSON.stringify(payload));
    let { data } = await saveAddress(payload);
    if (data.error) return;
    history.push("/address");
  };
  return (
    <div>
      <LayoutOne>
        <Topbar />
        <br />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl label="nama alamat">
              <InputText
                name="nama_alamat"
                placeholder="Nama Alamat"
                fitContainer
                {...register("nama_alamat", {
                  required: "Nama Alamat Harus di isi",
                  maxLength: {
                    value: 500,
                    message: "Maksimal karakter full name adalah 500",
                  },
                })}
              />
              {errors.nama_alamat && (
                <p style={{ color: "#bf1650" }}>{errors.nama_alamat.message}</p>
              )}
            </FormControl>
            <FormControl label="Provinsi">
              <SelectWilayah
                onChange={(option) => updateValue("provinsi", option)}
                name="provinsi"
                value={getValues().provinsi}
              />
            </FormControl>
            <FormControl label="kabupaten/kota">
              <SelectWilayah
                onChange={(option) => updateValue("kabupaten", option)}
                kodeInduk={getValues().provinsi?.value}
                tingkat="kabupaten"
                value={getValues().kabupaten}
              />
            </FormControl>
            <FormControl label="kecamatan">
              <SelectWilayah
                onChange={(option) => updateValue("kecamatan", option)}
                kodeInduk={getValues().kabupaten?.value}
                tingkat="kecamatan"
                value={getValues().kecamatan}
              />
            </FormControl>
            <FormControl label="kelurahan">
              <SelectWilayah
                onChange={(option) => updateValue("kelurahan", option)}
                kodeInduk={getValues().kecamatan?.value}
                tingkat="kelurahan"
                value={getValues().kelurahan}
              />
            </FormControl>
            <FormControl label="Detail Alamat">
              <InputText
                name="detail_pengiriman"
                placeholder="Detail Alamat Anda"
                fitContainer
                {...register("detail_pengiriman", {
                  required: "Detail Alamat harus di isi",
                  maxLength: {
                    value: 1000,
                    message: "Maksimal karakter detail alamat adalah 10000",
                  },
                })}
              />
            </FormControl>
            <Button fitContainer size="large">
              Simpan
            </Button>
          </form>
        </div>
      </LayoutOne>
    </div>
  );
}
