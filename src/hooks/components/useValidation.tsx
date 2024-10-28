import { number, object, string } from "yup";
export interface ValidationErrorsPatient {
  name?: string;
  address?: string;
  phone?: string;
  dob?: string;
}
export interface ValidationErrorsMedicines {
  name?: string;
  company?: string;
  stock?: number;
  price?: number;
  type?: string;
}
function useValidation() {
  const patientSchema = object({
    name: string().required("Vui lòng nhập tên bệnh nhân"),
    address: string().required("Vui lòng nhập địa chỉ của bệnh nhân"),
    phone: string().matches(
      /^\d{1,10}$/,
      "Số điện thoại phải đủ hoặc không dưới 10 số"
    ),
    dob: string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        "Ngày sinh phải có định dạng ngày-tháng-năm. Ví dụ: 27-04-2002"
      )
      .required("Không được để trống ngày sinh"),
  });
  const medicineSchema = object({
    name: string().required("Vui lòng nhập tên thuốc"),
    company: string().required("Vui lòng nhập tên công ty"),
    stock: number()
      .required("Vui lòng nhập số lượng tồn kho")
      .typeError("Số lượng tồn kho phải là kiểu số"),
    price: number()
      .required("Vui lòng nhập số giá thuốc")
      .typeError("Giá thuốc phải là kiểu số"),
    type: string().required("Vui lòng nhập loại thuốc"),
  });
  return { patientSchema, medicineSchema };
}

export default useValidation;
