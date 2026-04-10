import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const Scene1Logo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const textOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [40, 70], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0A2540 0%, #0D2F4F 100%)", justifyContent: "center", alignItems: "center", fontFamily }}>
      {/* Logo circle */}
      <div style={{
        width: 160, height: 160, borderRadius: "50%",
        background: "linear-gradient(135deg, #F5B041, #E8A020)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scale(${logoScale})`,
        boxShadow: "0 20px 60px rgba(245,176,65,0.3)",
      }}>
        <span style={{ fontSize: 60, fontWeight: 700, color: "#0A2540" }}>P</span>
      </div>

      {/* Company name */}
      <div style={{ marginTop: 30, opacity: textOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: "white", letterSpacing: 4 }}>
          PREMIUM LOCAÇÃO
        </div>
      </div>

      {/* Gold line */}
      <div style={{ width: lineWidth, height: 3, background: "#F5B041", marginTop: 20, borderRadius: 2 }} />

      {/* Tagline */}
      <div style={{ marginTop: 20, opacity: tagOpacity, fontSize: 22, color: "rgba(255,255,255,0.7)", letterSpacing: 2 }}>
        Mais de 30 anos de excelência
      </div>
    </AbsoluteFill>
  );
};
