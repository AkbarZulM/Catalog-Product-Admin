const CardImage = ({ img, name }) => {
  return (
    <img
      src={"http://localhost:5000" + img}
      alt={name}
      className="object-cover w-[203px] h-[170px] object-center"
    />
  );
};

export default CardImage;
