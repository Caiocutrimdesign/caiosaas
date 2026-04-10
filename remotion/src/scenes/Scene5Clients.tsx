import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400"], subsets: ["latin"] });

const clients = ["Vale", "Petrobras", "Suzano", "Gerdau", "ArcelorMittal", "CSN", "Votorantim", "Alcoa"];

export const Scene5Clients = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0D3055 0%, #0A2540 100%)", fontFamily, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity: headerOp, marginBottom: 50 }}>
        <div style={{ fontSize: 18, color: "#F5B041", letterSpacing: 6 }}>QUEM CONFIA EM NÓS</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "white", marginTop: 12 }}>Nossos Clientes</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 1200 }}>
        {clients.map((name, i) => {
          const delay = 15 + i * 8;
          const s = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 150 } });
          const op = interpolate(frame - delay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(s, [0, 1], [30, 0]);

          return (
            <div key={i} style={{
              width: 240, height: 80, background: "rgba(255,255,255,0.06)",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)", opacity: op, transform: `translateY(${y}px)`,
              fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 2,
            }}>
              {name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
