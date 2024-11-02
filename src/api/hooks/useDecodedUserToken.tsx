import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../../types";

// Mở rộng kiểu JwtPayload để bao gồm thuộc tính name
interface CustomJwtPayload extends JwtPayload {
  name?: string; // hoặc name: string nếu bạn chắc chắn rằng nó sẽ có
}

function useDecodedUserToken() {
  const [userData, setUserData] = useState<User>();
  const [decodedToken, setDecodedToken] = useState<CustomJwtPayload | null>(
    null
  );
  // localStorage.setItem("userData", JSON.stringify(response.data));
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const token = userData?.token;

  useEffect(() => {
    if (token) {
      // Chỉ giải mã token nếu nó không phải là undefined
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null); // Nếu không có token, đặt decodedToken thành null
    }
  }, [token]); // Chạy effect khi token thay đổi

  return { userData, decodedToken };
}

export default useDecodedUserToken;
