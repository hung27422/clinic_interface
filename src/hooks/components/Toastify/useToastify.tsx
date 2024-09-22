import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  title: string;
  type: "success" | "error" | "info" | "warning";
}

function useToastify({ title, type }: Props) {
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(title, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        break;
      case "error":
        toast.error(title, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        break;
      case "info":
        toast.info(title, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        break;
      case "warning":
        toast.warning(title, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        break;
      default:
        break;
    }
  };

  return { notify };
}

export default useToastify;
