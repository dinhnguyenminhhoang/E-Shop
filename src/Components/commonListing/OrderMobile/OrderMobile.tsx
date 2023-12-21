import GeneralProduct from "../../GeneralProduct/GeneralProduct";

interface OrderMobileProps {}
const OrderMobile: React.FC<OrderMobileProps> = ({}) => {
    const data = [
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/c/h/ch_i_game.png",
            heading: "chơi game",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/p/apple-iphone-14-pro-iphone-14-pro-max-deep-purple-220907_inline.jpg.large.png",
            heading: "dung lượng lớn",
            bg: "#979191",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/p/i/pin-trau-0092.png",
            heading: "bin trâu",
            bg: "#6d5f5f",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/c/a/cauhinhcao.png",
            heading: "cấu hình cao",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/c/h/ch_i_game.png",
            heading: "chơi game",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/p/apple-iphone-14-pro-iphone-14-pro-max-deep-purple-220907_inline.jpg.large.png",
            heading: "dung lượng lớn",
            bg: "#979191",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/p/i/pin-trau-0092.png",
            heading: "bin trâu",
            bg: "#6d5f5f",
        },
        {
            src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/c/a/cauhinhcao.png",
            heading: "cấu hình cao",
        },
    ];
    return (
        <div className="mt-2">
            <span className="font-bold text-xl py-2 block text-[#4a4a4a]">
                chọn theo nhu cầu
            </span>
            <div className="grid grid-cols-10 gap-2">
                {data?.length > 0 &&
                    data.map((item, index) => (
                        <GeneralProduct data={item} key={index} />
                    ))}
            </div>
        </div>
    );
};

export default OrderMobile;
