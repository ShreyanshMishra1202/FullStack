export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: "username required" });
  }

  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userResp, reposResp] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, { headers })
    ]);

    if (!userResp.ok) {
      const text = await userResp.text();
      return res.status(userResp.status).json({ error: text });
    }

    const user = await userResp.json();
    const repos = await reposResp.json();

    const topRepos = Array.isArray(repos)
      ? repos.sort((a,b)=>b.stargazers_count - a.stargazers_count).slice(0,6)
      : [];

    res.status(200).json({ user, topRepos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
