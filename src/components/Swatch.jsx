// Draws a kantha-style fabric swatch when a product has no photo yet.
// Each product gets a slightly different motif, seeded from its id.

function seed(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export default function Swatch({ id, color, label }) {
  const s = seed(id);
  const motif = s % 3; // 0 lotus, 1 concentric, 2 fish-scale rows
  const petals = 6 + (s % 4) * 2;
  const thread = "rgba(255,255,255,0.78)";
  const stitch = { stroke: thread, strokeWidth: 1.6, strokeDasharray: "5 4", fill: "none", strokeLinecap: "round" };

  return (
    <svg viewBox="0 0 200 250" role="img" aria-label={label} className="swatch" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="250" fill={color} />
      {/* running-stitch background rows, the signature of kantha */}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1="0" x2="200" y1={12 + i * 19} y2={12 + i * 19} style={{ ...stitch, opacity: 0.32 }} />
      ))}
      <rect x="12" y="12" width="176" height="226" rx="2" style={stitch} />
      <g transform="translate(100 125)">
        {motif === 0 &&
          Array.from({ length: petals }, (_, i) => (
            <ellipse key={i} cx="0" cy="-34" rx="11" ry="30" transform={`rotate(${(360 / petals) * i})`} style={stitch} />
          ))}
        {motif === 1 &&
          [18, 34, 50, 66].map((r) => <circle key={r} r={r} style={stitch} />)}
        {motif === 2 &&
          [-48, -16, 16, 48].map((y) =>
            [-60, -20, 20, 60].map((x) => (
              <path key={`${x}${y}`} d={`M${x - 18} ${y} q18 -26 36 0`} style={stitch} />
            ))
          )}
        <circle r="7" fill={thread} />
      </g>
    </svg>
  );
}
