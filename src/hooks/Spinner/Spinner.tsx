import icon_spinner from "../../assets/images/icon_spinner.png";
function Spinner() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <img
        className="animate-spin size-16"
        src={icon_spinner}
        alt="Loading spinner"
      />
    </div>
  );
}

export default Spinner;
