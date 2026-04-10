import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["800", "400"], subsets: ["latin"] });

export const Scene2Hero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 210], [1.05, 1.15], { extrapolateRight: "clamp" });
  const overlayOpacity = interpolate(frame, [0, 30], [0.8, 0.6], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [80, 0]);
  const titleOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [20, 60], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Background image with Ken Burns */}
      <AbsoluteFill style={{ transform: `scale(${imgScale})` }}>
        <Img src={staticFile("images/crane-hero.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill style={{ background: `rgba(10,37,64,${overlayOpacity})` }} />

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily }}>
        <div style={{ textAlign: "center", transform: `translateY(${titleY}px)`, opacity: titleOpacity }}>
          <div style={{ fontSize: 26, color: "#F5B041", letterSpacing: 6, marginBottom: 20, fontWeight: 400 }}>
            SOLUÇÕES EM
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "white", lineHeight: 1.1, maxWidth: 900 }}>
            Locação de Guindastes
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#F5B041", lineHeight: 1.1 }}>
            de Alta Performance
          </div>
        </div>
        <div style={{ width: lineW, height: 4, background: "#F5B041", marginTop: 40, borderRadius: 2 }} />
        <div style={{ marginTop: 25, opacity: subOpacity, fontSize: 20, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>
          Norte e Nordeste do Brasil
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
