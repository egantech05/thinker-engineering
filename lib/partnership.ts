import fs from "fs";
import path from "path";

const PARTNERSHIP_DIR = path.join(process.cwd(), "public/images/partnership");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

export function getPartnershipLogos() {
    try {
        const files = fs.readdirSync(PARTNERSHIP_DIR);
        return files
            .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
            .sort()
            .map((file) => ({
                name: path.parse(file).name,
                src: `/images/partnership/${file}`,
            }));
    } catch {
        return [];
    }
}