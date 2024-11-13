function useGetDateReExamDefault(daysToAdd: number) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysToAdd);

  // Lấy ngày, tháng, và năm từ đối tượng Date
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = currentDate.getFullYear();
  //Định dạng mm/dd/yyyy
  const dateReExamDefault = `${month}-${day}-${year}`;
  // Định dạng thành dd/mm/yyyy
  const dateReExamDefaultDMY = `${day}-${month}-${year}`;
  return { dateReExamDefault, dateReExamDefaultDMY };
}

export default useGetDateReExamDefault;
