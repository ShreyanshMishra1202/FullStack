import { useEffect, useState, useRef } from "react";
import Resume from "../components/Resume";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const defaultUser = "ShreyanshMishra1202";
  const [username, setUsername] = useState(defaultUser);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef();

  async function fetchGithub(u) {
    if (!u) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(u)}`);
      const json = await res.json();
      if (res.ok) setData(json);
      else setData({ error: json.error || "Failed to fetch" });
    } catch (err) {
      setData({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGithub(defaultUser);
  }, []);

  async function exportPDF() {
    if (!resumeRef.current) return;
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${username}-resume.pdf`);
  }

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", padding: 20 }}>
      <h1>GitHub Resume App</h1>
      <p>Enter a GitHub username to generate a resume from their public profile and top repos.</p>

      <div style={{ marginBottom: 12 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          style={{ padding: 8, width: 240 }}
        />
        <button onClick={() => fetchGithub(username)} style={{ marginLeft: 8, padding: "8px 12px" }}>
          Fetch
        </button>
        <button onClick={exportPDF} style={{ marginLeft: 8, padding: "8px 12px" }}>
          Export PDF
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {data && data.error && <div style={{ color: "red" }}>{String(data.error)}</div>}

      {data && !data.error && (
        <div ref={resumeRef}>
          <Resume user={data.user} repos={data.topRepos} />
        </div>
      )}

      <footer style={{ marginTop: 24, color: "#666" }}>
        Tip: add a GITHUB_TOKEN in .env.local for more requests: GITHUB_TOKEN=ghp_xxx
      </footer>
    </div>
  );
}
