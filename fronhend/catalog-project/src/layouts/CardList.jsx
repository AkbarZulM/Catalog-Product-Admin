import CardBody from "./CardBody";

const CardList = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item, index) => (
        <CardBody key={index} {...item} />
      ))}
    </div>
  );
};

export default CardList;
