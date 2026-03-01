export default function Footer() {
    return (
      <footer className="bg-[#1F2937] text-gray-400 py-10 px-6 text-center">
        <p className="font-display text-white font-bold text-xl mb-2">
          Surya Prakash J<span className="text-[#FF8A4C]">.</span>
        </p>
        <p className="text-sm mb-4">MERN Stack Developer · Building the web, one component at a time.</p>
        <div className="flex items-center justify-center gap-6 mb-6">
          <a
            href="https://github.com/surya3665"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF8A4C] transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF8A4C] transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:suryaprakash882578@gmail.com"
            className="hover:text-[#FF8A4C] transition-colors text-sm"
          >
            Email
          </a>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Surya Prakash J. All rights reserved.
        </p>
      </footer>
    )
  }