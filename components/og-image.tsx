import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get("title") || "NXTRS";
    const mode = searchParams.get("mode") || "light";

    const fontData = await fetch(
      new URL("https://fonts.googleapis.com/css2?family=Tinos&display=swap")
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: mode === "dark" ? "black" : "white",
            color: mode === "dark" ? "white" : "black",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                mode === "dark"
                  ? "rgba(0, 0, 0, 0.65)"
                  : "rgba(199, 199, 199, 0.9)",
              padding: "40px",
              borderRadius: "10px",
              width: "90%",
              height: "80%",
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontFamily: "Tinos",
                fontWeight: "normal",
                marginBottom: "10px",
              }}
            >
              NXT
            </div>
            <div
              style={{
                fontSize: 60,
                fontFamily: "Tinos",
                fontWeight: "normal",
                marginBottom: "40px",
              }}
            >
              RS
            </div>
            <div
              style={{
                fontSize: 40,
                fontFamily: "Tinos",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {title}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Tinos",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
            }}
          >
            NXTRS
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
