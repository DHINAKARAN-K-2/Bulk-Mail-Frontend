function FileUpload({ onFileChange, emailCount }) {
  return (
    <>
      <label className="block border-2 border-dashed border-indigo-400 rounded-lg p-4 text-center cursor-pointer hover:bg-indigo-50 transition">
        <input type="file" onChange={onFileChange} className="hidden" />
        <p className="text-gray-600 font-medium">
          📂 Upload Excel File (.xlsx)
        </p>
        <p className="text-sm text-gray-400">
          First column should contain email addresses
        </p>
      </label>

      <p className="text-center mt-3 text-sm text-gray-600">
        Total Emails: <span className="font-bold">{emailCount}</span>
      </p>
    </>
  );
}

export default FileUpload;
