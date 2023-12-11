import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewOrder } from "../../redux/reducers/orderSlice";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TotalPrice from "../ProductPage/totalPrice";
import StripeContainer from "./StripeContainer";


export default function RequestToBook({ listing, dateFrom, dateTo, totalPrice, totalWithFees, days }) {
    const dispatch = useDispatch();
    const order = {
        order_item: {
            listing_id: listing._id,
            days: days,
            date_from: dateFrom,
            date_to: dateTo,
            nightly_price: listing.price,
            total_price: Number(totalPrice),
            total_with_fees: Number(totalWithFees)
        }
    }
    const submitOrder = (data) => {
        dispatch(createNewOrder(data));
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="p-8 text-xl m-2" >Request to book</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[70vw]">
                    <DialogHeader>
                        <DialogTitle>Confirm your order</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center  space-x-2">
                        <div className="w-1/2 flex flex-col gap-4">
                            <TotalPrice className="border-none h-[300px]"
                                listing={listing}
                                days={days}
                                totalPrice={totalPrice}
                            />
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                        </div>
                        <div className="w-[1px] h-[70%] bg-slate-200"></div>
                        <div className="w-1/2 h-full">
                            <StripeContainer />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}