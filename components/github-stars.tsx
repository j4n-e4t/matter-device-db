"use client"

import { useEffect, useState } from "react"
import { Github, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const REPO_URL = "https://github.com/j4n-e4t/matter-device-db"
const API_URL = "https://api.github.com/repos/j4n-e4t/matter-device-db"

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }
  return count.toString()
}

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        // Silently fail - just won't show star count
      })
  }, [])

  return (
    <Button variant="outline" size="sm" asChild>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on GitHub"
        className="flex items-center gap-1.5"
      >
        <Github className="h-4 w-4" />
        {stars !== null && (
          <>
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{formatStarCount(stars)}</span>
          </>
        )}
      </a>
    </Button>
  )
}
