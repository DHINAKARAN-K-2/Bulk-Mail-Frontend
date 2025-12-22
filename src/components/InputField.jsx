function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  );
}

export default InputField;
