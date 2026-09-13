"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";

export default function Navbar() {
  return (
    <nav
      className="w-full border-b border-[#292929] py-3 px-6"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-center gap-8">
        <Link
          href="#roadmap"
          className="nav-link"
        >
          roadmap
        </Link>
        <Link
          href="https://brainboard.anshumancdx.xyz"
          className="nav-link"
          
        >
          use a whiteboard
        </Link>
        <a
          href="https://github.com/learn-genai-website"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link flex items-center gap-1.5"
          aria-label="GitHub (opens in new tab)"
        >
          <HugeiconsIcon icon={GithubIcon} size={14} strokeWidth={1.5} />
          github
        </a>
      </div>
    </nav>
  );
}
