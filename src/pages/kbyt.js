import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";

const Kbyt = () => {
  const api = "https://provinces.open-api.vn/api";
  // /p/{code}
  // depth = 1, tỉnh
  // depth = 2, quận huyện
  // depth = 3, xã
  const [thanhpho, setthanhpho] = useState();
  const [quan, setQuan] = useState();
  const [xa, setXa] = useState();
  const [dauHieu, setDauHieu] = useState({
    sot: false,
    ho: false,
  });

  const handleChangeDauHieu = (e) => {
    setDauHieu({ ...dauHieu, [e.target.name]: e.target.value });
  };

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      cmnd: "",
      namSinh: "",
      gioiTinh: "",
      quocTich: "Việt Nam",
      congTy: "",
      boPhan: "",
      theBHYT: false,
      thanhpho: "",
      quan: "",
      xa: "",
      soNha: "",
      dienThoai: "",
      email: "",
      lanhThoDiQua: "",
    },
    validationSchema: Yup.object({
      hoTen: Yup.string().required("Required"),
      cmnd: Yup.string()
        .required("Required")
        .matches(/^[0-9]{9,12}$/, "CMND 9-12 số"),
      namSinh: Yup.string()
        .required("Required")
        .matches(
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
          "EX: dd/mm/yyyy, dd--mm-yyyy, dd.mm.yyyy"
        ),
      gioiTinh: Yup.string().required("Required"),
      quocTich: Yup.string().required("Required"),
      thanhpho: Yup.string().required("Required"),
      quan: Yup.string().required("Required"),
      xa: Yup.string().required("Required"),
      soNha: Yup.string().required("Required"),
      dienThoai: Yup.string()
        .required("Required")
        .matches(/^[0-9]{10,11}$/,'Phone invalid! EX:0886249022'),
      email: Yup.string()
        .required("Required")
        .email("Email Invalid! Ex:datly@gmail.com"),
    }),
  });
  useEffect(() => {
    getCity();
  }, []);

  useEffect(() => {
    getQuan(formik.values.thanhpho);
  }, [formik.values.thanhpho]);

  useEffect(() => {
    getXa(formik.values.quan);
  }, [formik.values.quan]);

  const getCity = async () => {
    try {
      const res = await axios.get(`${api}/p?depth=1`);
      setthanhpho(res.data);
    } catch (err) {}
  };

  const getQuan = async (code) => {
    try {
      const res = await axios.get(`${api}/p/${code}?depth=2`);
      setQuan(res.data.districts);
    } catch (err) {}
  };

  const getXa = async (code) => {
    try {
      const res = await axios.get(`${api}/d/${code}?depth=2`);
      setXa(res.data.wards);
    } catch (err) {}
  };

  console.log(formik.errors);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[500px] border p-5 rounded-md mt-5 mb-5">
        <h1 className="uppercase text-2xl pb-5">Tờ khai y tế</h1>
        <InputField
          label={"Họ tên"}
          handleChange={formik.handleChange}
          name="hoTen"
          error={
            formik.errors.hoTen && formik.touched.hoTen && formik.errors.hoTen
          }
          handleBlur={formik.handleBlur}
        />
        <InputField
          label={"Số hộ chiếu/CMND"}
          name="cmnd"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={
            formik.errors.cmnd && formik.touched.cmnd && formik.errors.cmnd
          }
        />
        <InputField
          label={"Năm sinh"}
          name="namSinh"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          error={
            formik.errors.namSinh &&
            formik.touched.namSinh &&
            formik.errors.namSinh
          }
        />
        <div className="mt-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quốc tịch</InputLabel>
            <Select
              defaultValue={"VN"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quốc tịch"
              onChange={formik.handleChange}
            >
              <MenuItem value={"VN"}>Việt Nam</MenuItem>
            </Select>
            {formik.errors.quocTich && formik.touched.quocTich && (
              <p className="text-red-500 text-lg">{formik.errors.quocTich}</p>
            )}
          </FormControl>
        </div>
        <InputField
          label={"Công ty làm việc"}
          name="congTy"
          values={formik.values.congTy}
          handleChange={formik.handleChange}
        />
        <InputField
          label={"Bộ phận làm việc"}
          name="boPhan"
          values={formik.values.boPhan}
          handleChange={formik.handleChange}
        />
        <div className="mt-3">
          <FormControlLabel
            control={
              <Checkbox
                name="theBHYT"
                checked={formik.values.theBHYT}
                onChange={formik.handleChange}
              />
            }
            label="Có thẻ bảo hiểm y tế"
          />
        </div>
        <div
          className={`mt-3 ${
            formik.errors.gioiTinh &&
            formik.touched.gioiTinh &&
            "border border-red-500"
          }`}
        >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gioiTinh"
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {formik.errors.gioiTinh && formik.touched.gioiTinh && (
              <p className="text-red-500 text-lg">{formik.errors.gioiTinh}</p>
            )}
          </FormControl>
        </div>

        <h2 className="text-xl uppercase mt-3">Địa chỉ liên lạc</h2>
        <div className="mt-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tỉnh thành</InputLabel>
            <Select
              onChange={formik.handleChange}
              name="thanhpho"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              className={`${
                formik.errors.thanhpho &&
                formik.touched.thanhpho &&
                "border border-red-500"
              }`}
            >
              {thanhpho?.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.thanhpho && formik.touched.thanhpho && (
              <p className="text-red-500 text-lg">{formik.errors.thanhpho}</p>
            )}
          </FormControl>
        </div>
        <div className="mt-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quận huyện</InputLabel>
            <Select
              onChange={formik.handleChange}
              name="quan"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              disabled={!formik.values.thanhpho}
              className={`${
                formik.errors.quan &&
                formik.touched.quan &&
                "border border-red-500"
              }`}
            >
              {quan?.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.quan && formik.touched.quan && (
              <p className="text-red-500 text-lg">{formik.errors.quan}</p>
            )}
          </FormControl>
        </div>
        <div className="mt-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Xã</InputLabel>
            <Select
              onChange={formik.handleChange}
              name="xa"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              className={`${
                formik.errors.xa && formik.touched.xa && "border border-red-500"
              }`}
              disabled={!formik.values.quan}
            >
              {xa?.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.xa && formik.touched.xa && (
              <p className="text-red-500 text-lg">{formik.errors.xa}</p>
            )}
          </FormControl>
        </div>
        <InputField
          label={"Số nhà, phố"}
          value={formik.values.soNha}
          handleChange={formik.handleChange}
          name="soNha"
          handleBlur={formik.handleBlur}
          error={
            formik.errors.soNha && formik.touched.soNha && formik.errors.soNha
          }
        />
        <InputField
          label={"Điện thoại"}
          value={formik.values.dienThoai}
          handleChange={formik.handleChange}
          name="dienThoai"
          handleBlur={formik.handleBlur}
          error={
            formik.errors.dienThoai &&
            formik.touched.dienThoai &&
            formik.errors.dienThoai
          }
        />
        <InputField
          label={"Email"}
          value={formik.values.email}
          handleChange={formik.handleChange}
          name="email"
          handleBlur={formik.handleBlur}
          error={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        />
        <div className="mt-3">
          <p className="text-md py-2 text-left">
            Trong vòng 14 ngày qua, Anh/Chị đến quốc gia/ vùng lãnh thổ nào (Có
            thể đi qua nhiều quốc gia)
          </p>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: "100%" }}
            name="lanhThoDiQua"
            onChange={formik.values.lanhThoDiQua}
            className="rounded-md px-3 py-1 bg-transparent border border-gray-400 outline-none text-black placeholder:text-[#666]"
          />
        </div>
        <div className="mt-3">
          <p className="text-md text-left">
            Trong vòng 14 ngày qua, Anh/Chị thấy xuất hiện dấu hiệu nào sau đây
            không?
          </p>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="sot"
                  value={!dauHieu.sot}
                  onChange={handleChangeDauHieu}
                />
              }
              label="Sốt"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="ho"
                  value={!dauHieu.ho}
                  onChange={handleChangeDauHieu}
                />
              }
              label="Ho"
            />
          </FormGroup>
        </div>
        <div className="mt-3">
          <Button onClick={formik.handleSubmit} variant="contained" fullWidth>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Kbyt;