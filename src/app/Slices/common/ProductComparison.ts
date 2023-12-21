import { ProductType } from "@/common/product";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [] as ProductType[],
};

const ProductComparison = createSlice({
    name: "ProductComparison",
    initialState,
    reducers: {
        setCompariProduct: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setCompariProduct } = ProductComparison.actions;
export default ProductComparison.reducer;
