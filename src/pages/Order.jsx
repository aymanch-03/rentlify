import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { listOrders } from "../redux/reducers/orderSlice";

const OrderPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const isLoading = useSelector((state) => state.orders.isLoading);

  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Order ID",
    keyTwo: "customer_id",
    keyTwoTitle: "Customer email",
    keyThree: "status",
    keyThreeTitle: "Ordrer Status",
    keyFour: "createdAt",
    keyFourTitle: "Created At",
    keyFive: "cart_total_price",
    keyFiveTitle: "Total price",
    option: "orders",
  });
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Orders Management
            </h2>
            <p className="text-muted-foreground">
              {"Here's"} a list of your orders!
            </p>
          </div>
        </div>

        <DataTable data={orders} columns={columns} isLoading={isLoading} />
      </div>
    </>
  );
};

export default OrderPage;
