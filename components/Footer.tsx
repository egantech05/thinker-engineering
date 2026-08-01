export default function Footer() {
    return (
        <footer className="mt-16 -mx-6 md:-mx-16 bg-transparent text-white text-xs">
            <div className="max-w-6xl mx-auto px-6 md:px-16 py-6 flex justify-center items-center text-center">
                <span>© {new Date().getFullYear()} Thinker Engineering. All rights reserved.</span>
            </div>
        </footer>
    );
}