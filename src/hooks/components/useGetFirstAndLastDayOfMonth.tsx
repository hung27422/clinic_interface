interface Props {
  year: number;
  month: number;
}
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
function useGetFirstAndLastDayOfMonth({ year, month }: Props) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
}
export default useGetFirstAndLastDayOfMonth;
