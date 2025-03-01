const CheckBox = ({
  id,
  name,
  ...props
}: {
  id: string;
  name: string;
  [x: string]: any;
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      {...props}
      className="form-checkbox h-5 w-5 text-gray-800 rounded"
    />
  );
};

export default CheckBox;
