import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const Scene7Closing = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const op = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const igOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Fade out at end
  const fadeOut = interpolate(frame, [90, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0A2540, #0D2F4F)", fontFamily, justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      <div style={{ textAlign: "center", transform: `scale(${scale})`, opacity: op }}>
        {/* Logo */}
        <div style={{
          width: 120, height: 120, borderRadius: "50%", margin: "0 auto 30px",
          background: "linear-gradient(135deg, #F5B041, #E8A020)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 15px 50px rgba(245,176,65,0.3)",
        }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: "#0A2540" }}>P</span>
        </div>

        <div style={{ fontSize: 40, fontWeight: 700, color: "white", letterSpacing: 3 }}>
          PREMIUM LOCAÇÃO
        </div>
        <div style={{ width: 60, height: 3, background: "#F5B041", margin: "20px auto", borderRadius: 2 }} />
      </div>

      <div style={{ opacity: igOp, fontSize: 22, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>
        @premiumlocacao
      </div>
    </AbsoluteFill>
  );
};
