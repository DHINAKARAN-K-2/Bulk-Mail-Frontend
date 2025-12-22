function SendButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full mt-5 py-3 rounded-lg text-white font-semibold transition
      ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
    >
      {loading ? "Sending Emails..." : "🚀 Send Emails"}
    </button>
  );
}

export default SendButton;
