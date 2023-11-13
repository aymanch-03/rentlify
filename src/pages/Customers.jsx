// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { listCustomers } from "../redux/reducers/customerSlice";

const CustomerPage = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const customers = useSelector((state) => state.customers.data); // Access customer data from Redux store
  const isLoading = useSelector((state) => state.customers.isLoading); // Access customer data from Redux store

  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Customer Id ",
    keyTwo: "email",
    keyTwoTitle: "Email Address",
    keyThree: "active",
    keyThreeTitle: "Status",
    keyFour: "valid_account",
    keyFourTitle: "Valid / Invalid",
    keyFive: "createdAt",
    keyFiveTitle: "Created At",
    option: "customers",
  });

  useEffect(() => {
    // Fetch customer data when the component mounts

    dispatch(listCustomers());
  }, [dispatch]);

  return (
    <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Customers Management
          </h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of your customers!
          </p>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
      <div className="">
        <DataTable
          data={customers}
          columns={columns}
          option={"customers"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CustomerPage;
