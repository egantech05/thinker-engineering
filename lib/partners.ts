import fs from "fs";
import path from "path";

const PARTNER_DIR = path.join(process.cwd(), "public/images/partner");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

export function getPartnerLogos() {
    try {
        const files = fs.readdirSync(PARTNER_DIR);
        return files
            .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
            .sort()
            .map((file) => ({
                name: path.parse(file).name,
                src: `/images/partner/${file}`,
            }));
    } catch {
        return [];
    }
}