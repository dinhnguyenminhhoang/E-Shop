interface PosterProps {
    data: {
        imageUrl: string;
    };
}
const Poster: React.FC<PosterProps> = ({ data }) => {
    return (
        <div className="overflow-hidden flex items-center justify-center border-b">
            <img
                src={data.imageUrl}
                alt="slide"
                className="w-auto h-80 object-left-top rounded-t-borderContnet"
            />
        </div>
    );
};

export default Poster;
