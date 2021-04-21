import { transaction } from "../../components/Data";

import checklist from "../../images/icon/checklist.png";
import clock from "../../images/icon/clock.png";
import cancel from "../../images/icon/cancel.png";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Crud } from "../core/CRUD/view";

const IncomeTransaction = () => {
  const [state, dispatch] = useContext(UserContext);

  const payload = {
    mode: "VIEW",
    url: "/transactions/",
    cache: "incomeTransaction",
  };

  const getTransaction = Crud(payload);

  const transaction = getTransaction?.data?.data?.data?.transaction;

  return (
    <div>
      <div className="container mt-5">
        <h2>Income Transaction</h2>
        <table class="table table-bordered mt-5">
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th className="text-center" scope="col">
                No
              </th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Product Order</th>
              <th className="text-center" scope="col">
                Status
              </th>
              <th className="text-center" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {getTransaction?.data?.data?.data?.transaction?.map((data, key) => (
              <tr>
                <th className="text-center" scope="row">
                  {key + 1}
                </th>
                <td>{data.user.fullname}</td>
                <td>{data.user.location}</td>
                <td>{data.order.map((dataOrder) => dataOrder.title + ", ")}</td>
                <td className="text-center">{data.status}</td>
                <td className="text-center">
                  <button className="btn btn-danger btn-sm">Cancel</button>
                  <button className="ms-3 btn btn-success btn-sm">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeTransaction;
