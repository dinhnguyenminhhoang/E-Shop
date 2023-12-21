import Slider from "react-slick";
import { useState, useRef, useEffect } from "react";
import NextBtn from "./NextBtn";
import PreBtn from "./PreBtn";
import { ProductType } from "../../common/product";
import { PosterType } from "../../common/Poster";
import { useDispatch, useSelector } from "react-redux";
import { setnumberSlideSlide } from "@/app/Slices/common/numberSlideSlide";

interface SlideProps {
    data: ProductType[] | PosterType[] | any;
    numberSlide?: number;
    ItemSlide: any;
    slideDescription?: boolean;
}
const Slide: React.FC<SlideProps> = ({
    data,
    numberSlide,
    ItemSlide,
    slideDescription,
}) => {
    const dispatch = useDispatch<any>();
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const numberSlideData = useSelector(
        (state: any) => state.numberSlide.numberSlideData
    );
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1024) {
                dispatch(setnumberSlideSlide(5));
            } else if (screenWidth >= 768) {
                dispatch(setnumberSlideSlide(2));
            } else {
                dispatch(setnumberSlideSlide(1));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch]);
    const handleNextClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const handleSetSlider = (index: number) => {
        sliderRef.current?.slickGoTo(index);
    };
    var settings = {
        infinite: true,
        speed: 200,
        slidesToShow: numberSlide || numberSlideData || 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn onClick={handleNextClick} />,
        prevArrow: <PreBtn onClick={handlePrevClick} />,
        autoplay: true,
        autoplaySpeed: 2000,
        afterChange: (index: number) => {
            setCurrentSlide(index);
        },
    };
    return (
        <div>
            <Slider
                {...settings}
                ref={sliderRef}
                className="group cursor-pointer"
            >
                {data?.length > 0 &&
                    data.map((item: any, index: number) => (
                        <ItemSlide key={index} data={item} />
                    ))}
            </Slider>
            {data?.length > 0 && slideDescription && (
                <div className="flex justify-between items-center">
                    {data.map((item: any, index: number) => {
                        if (item.label) {
                            return (
                                <span
                                    className={`w-full text-center py-4 cursor-pointer hover:bg-backgroundHover md:text-sm text-xs font-bold md:font-normal ${
                                        currentSlide === index
                                            ? "border-b-4 border-custom-primary transition-border hover:border-red-500"
                                            : ""
                                    }`}
                                    key={index}
                                    onClick={() => handleSetSlider(index)}
                                >
                                    {item.label}
                                </span>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default Slide;
