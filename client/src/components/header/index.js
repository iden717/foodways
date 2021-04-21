import Guest from "./HeaderGuest";
import Partner from "./HeaderPartner";
import Customer from "./HeaderCustomer";

const SwitchHeader = ({ role }) => {
  switch (role) {
    case "CUSTOMER":
      return <Customer />;
    case "PARTNER":
      return <Partner />;
    default:
      return <Guest />;
  }
};

export default SwitchHeader;
