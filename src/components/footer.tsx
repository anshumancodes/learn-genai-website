"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Coffee01Icon } from "@hugeicons/core-free-icons";

export default function Footer() {
  return (
    <footer className="border-t border-[#292929] py-4 px-6 mt-auto">
      <div className="flex items-center justify-between text-xs font-body text-[#29391D]">
        <span>learn genAI</span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/learn-genai-website"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#3A4A29] transition-colors"
            aria-label="GitHub (opens in new tab)"
          >
            <HugeiconsIcon icon={GithubIcon} size={14} strokeWidth={1.5} />
            github
          </a>
          <a
            href="https://buymeacoffee.com/anshumancdx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#3A4A29] transition-colors"
            aria-label="Buy me a coffee (opens in new tab)"
          >
            <HugeiconsIcon icon={Coffee01Icon} size={14} strokeWidth={1.5} />
            buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}
