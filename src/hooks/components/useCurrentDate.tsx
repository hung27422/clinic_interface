function useCurrentDate() {
  const today = new Date();
  // Lấy ngày (ngày trong tháng)
  const day = today.getDate();
  // Lấy tháng
  const month = today.getMonth() + 1;
  // Lấy năm
  const year = today.getFullYear();
  const currentDate = `${month}-${day}-${year}`;
  return { today, day, month, year, currentDate };
}

export default useCurrentDate;
