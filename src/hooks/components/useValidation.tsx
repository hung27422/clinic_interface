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
  specialty?: string;
  nutritional?: string;
  dosage?: string;
}
export interface ValidationErrorsExaminations {
  reason?: string;
  history?: string;
  diagnosis?: string;
  summary?: string;
}
export interface ValidationErrorsPrescriptions {
  [key: string]: string | undefined; // Chấp nhận chuỗi làm khóa
  [key: number]: string | undefined; // Chấp nhận số làm khóa
}
export interface ValidationErrorsLogin {
  name?: string;
  password?: string;
}
function useValidation() {
  const patientSchema = object({
    name: string().required("Vui lòng nhập tên bệnh nhân"),
    address: string().required("Vui lòng nhập địa chỉ của bệnh nhân"),
    phone: string().matches(
      /^\d{10}$/,
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
    specialty: string().required("Vui lòng nhập tên biệt dược của thuốc"),
    nutritional: string().required("Vui lòng nhập hàm lượng của thuốc"),
    dosage: string().required("Vui lòng nhập bào chế của thuốc"),
    stock: number()
      .required("Vui lòng nhập số lượng tồn kho")
      .typeError("Số lượng tồn kho phải là kiểu số")
      .positive("Số lượng phải lớn hơn 0"),
    price: number()
      .required("Vui lòng nhập số giá thuốc")
      .typeError("Giá thuốc phải là kiểu số")
      .positive("Giá thuốc phải lớn hơn 0"),
  });
  const examinationSchema = object({
    reason: string().required("Vui lòng nhập lý do khám"),
    history: string().required("Vui lòng nhập tiền căn của bệnh nhân"),
    diagnosis: string().required("Vui lòng nhập chẩn đoán của bác sĩ"),
    summary: string().required("Vui lòng nhập thông tin bệnh tổng quát"),
  });
  const prescriptionSchema = object({
    name: string().required("Tên thuốc là bắt buộc"),
    numberOfDays: number()
      .required("Số lượng ngày là bắt buộc")
      .typeError("Số lượng ngày phải là số")
      .positive("Số lượng ngày phải lớn hơn 0"),
  });
  const loginSchema = object({
    name: string().required("Vui lòng nhập tài khoản"),
    password: string().required("Vui lòng nhập mật khẩu"),
  });
  return {
    patientSchema,
    medicineSchema,
    examinationSchema,
    prescriptionSchema,
    loginSchema,
  };
}

export default useValidation;
