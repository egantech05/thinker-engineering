import fs from "fs";
import path from "path";

const CERTS_DIR = path.join(process.cwd(), "public/images/certs");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

export function getCertLogos() {
    try {
        const files = fs.readdirSync(CERTS_DIR);
        return files
            .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
            .sort()
            .map((file) => ({
                name: path.parse(file).name,
                src: `/images/certs/${file}`,
            }));
    } catch {
        return [];
    }
}