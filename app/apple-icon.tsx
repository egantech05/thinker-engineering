import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#ffffff",
                }}
            >
                <svg width="120" height="120" viewBox="0 0 406.545 407.266">
                    <g transform="translate(-195.27213,-95.274802)">
                        <path
                            d="M 0,0 150.018,153.186 215.548,87.655 129.437,2.627 150.018,-18.494 236.67,67.346 258.333,44.87 175.472,-41.241 195.51,-62.362 284.329,21.418 304.909,0 194.427,-109.479 86.111,0 171.68,88.197 152.454,108.235 20.039,-20.119 Z"
                            fill="#273c90"
                            transform="matrix(1.3333333,0,0,-1.3333333,195.27213,299.5228)"
                        />
                        <path
                            d="M 0,0 22.746,21.122 134.311,-89.902 112.919,-109.94 Z"
                            fill="#f6c716"
                            transform="matrix(1.3333333,0,0,-1.3333333,247.98627,355.9544)"
                        />
                    </g>
                </svg>
            </div>
        ),
        size
    );
}