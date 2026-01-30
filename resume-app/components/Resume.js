export default function Resume({ user, repos = [] }) {
  const fallbackName = user?.name || user?.login;
  return (
    <div style={{
      maxWidth: 800,
      margin: "12px auto",
      padding: 20,
      border: "1px solid #ddd",
      borderRadius: 8,
      background: "#fff",
      color: "#111"
    }}>
      <header style={{ display: "flex", gap: 16 }}>
        <img src={user?.avatar_url} alt="avatar" width={120} height={120} style={{ borderRadius: 8 }} />
        <div>
          <h2 style={{ margin: 0 }}>{fallbackName}</h2>
          <div style={{ color: "#555" }}>{user?.bio}</div>
          <div style={{ marginTop: 8 }}>
            <strong>Location:</strong> {user?.location || "—"} | <strong>Company:</strong> {user?.company || "—"}
          </div>
          <div style={{ marginTop: 8 }}>
            <a href={user?.html_url} target="_blank" rel="noreferrer">{user?.html_url}</a>
          </div>
        </div>
      </header>

      <section style={{ marginTop: 18 }}>
        <h3 style={{ marginBottom: 6 }}>Top Projects</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {repos.map((r) => (
            <div key={r.id} style={{ padding: 10, border: "1px solid #eee", borderRadius: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <a href={r.html_url} target="_blank" rel="noreferrer"><strong>{r.name}</strong></a>
                </div>
                <div style={{ color: "#999" }}>★ {r.stargazers_count}</div>
              </div>
              <div style={{ color: "#555" }}>{r.description}</div>
              <div style={{ marginTop: 6, color: "#777", fontSize: 13 }}>
                {r.language || "—"} • Updated {new Date(r.updated_at).toLocaleDateString()}
              </div>
            </div>
          ))}
          {repos.length === 0 && <div style={{ color: "#666" }}>No repos found</div>}
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Skills (edit as needed)</h3>
        <div style={{ color: "#333" }}>
          JavaScript • React • Next.js • Node.js • HTML • CSS
        </div>
      </section>
    </div>
  );
}
