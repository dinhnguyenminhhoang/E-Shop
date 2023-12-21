const BoxContent = () => {
    return (
        <div className="flex flex-col gap-2 items-center bg-white shadow-custom rounded-borderContnet p-4 w-1/3">
            <img src="https://cellphones.com.vn/smember/_nuxt/img/gift-box(1)1.ad696df.png" alt="" width={80} height={80} className="p-2 border rounded-full" />
            <span className="text-2xl font-bold text-custom-Colorprimary">Ưu đãi của bạn</span>
            <span className="text-lg text-[#4a4a4a] font-medium">(0) ưu đãi</span>
            <button className="text-white px-4 py-2 bg-custom-bg_button rounded-borderContnet text-xl">Xem chi tiết</button>
        </div>
    );
}

export default BoxContent;