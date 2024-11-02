import useDecodedUserToken from "../../api/hooks/useDecodedUserToken";

function useConfirmTokenUser() {
  const { decodedToken } = useDecodedUserToken();
  //Lấy thời gian hết hạn từ token
  const expExpirationTime = decodedToken?.exp ?? 0;
  //Lấy thời gian hiện tại và chuyển qua giây để so sánh
  const currentTime = Date.now() / 1000;
  //Nếu thời gian hiện tại lớn hơn thời gian token thì token còn hạn
  const isTokenExpired = currentTime < expExpirationTime;

  return { isTokenExpired };
}

export default useConfirmTokenUser;
