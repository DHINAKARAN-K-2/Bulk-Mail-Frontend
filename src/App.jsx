import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import Header from "./components/Header";
import InputField from "./components/InputField";
import TextArea from "./components/TextArea";
import FileUpload from "./components/FileUpload";
import SendButton from "./components/SendButton";

function App() {
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPass, setSenderPass] = useState("");
  const [sub, setSub] = useState("");
  const [msg, setMsg] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [status, setStatus] = useState(false);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const emails = data.map(row => row[0]).filter(Boolean);
      setEmaillist(emails);
    };
    reader.readAsBinaryString(file);
  }

  function sendMail() {
    if (!senderEmail || !senderPass || !sub || !msg || emaillist.length === 0) {
      alert("Please fill all fields and upload email file");
      return;
    }

    setStatus(true);
    axios.post("http://localhost:5000/sendemail", {
      senderEmail,
      senderPass,
      sub,
      msg,
      emaillist
    })
    .then(res => {
      alert(res.data ? "✅ Emails Sent Successfully" : "❌ Failed to Send Emails");
      setStatus(false);
    })
    .catch(() => {
      alert("❌ Server Error");
      setStatus(false);
    });
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">

        <Header />

        <InputField
          type="email"
          placeholder="Sender Email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Gmail App Password"
          value={senderPass}
          onChange={(e) => setSenderPass(e.target.value)}
        />

        <InputField
          type="text"
          placeholder="Email Subject"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
        />

        <TextArea
          placeholder="Email Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <FileUpload
          onFileChange={handleFile}
          emailCount={emaillist.length}
        />

        <SendButton onClick={sendMail} loading={status} />

        <p className="text-xs text-center text-gray-400 mt-4">
          ⚠ Use Gmail App Password only
        </p>

      </div>
    </div>
  );
}

export default App;
