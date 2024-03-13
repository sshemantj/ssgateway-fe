import { store } from "@/store";
import { openLoginModal } from "@/store/slices/loginSlice";

const handleStatus = (status: number | undefined) => {
  switch (status) {
    case 403:
    case 401:
      handleUnauthorize();
      break;
    default:
    // console.log(status);
  }
};

function handleUnauthorize() {
  store.dispatch(openLoginModal());
}

export { handleStatus };
