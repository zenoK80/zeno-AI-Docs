import type { NextConfig } from 'next'
import nextra from 'nextra'

const withNextra = nextra({
  latex: { renderer: 'katex', options: { strict: false } },
})

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default withNextra(nextConfig)