import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'

const getNextraStaticParams = generateStaticParamsFor('mdxPath')

export async function generateStaticParams() {
  const params = await getNextraStaticParams()

  return params.map((param) => {
    if (!Array.isArray(param.mdxPath)) return param

    // Nextra represents content/index.mdx as ['']; Next static export expects [].
    if (param.mdxPath.length === 1 && param.mdxPath[0] === '') {
      return { ...param, mdxPath: [] }
    }

    // Next compares catch-all params with the URL-encoded browser pathname.
    return {
      ...param,
      mdxPath: param.mdxPath.map((segment) =>
        encodeURIComponent(decodeURIComponent(segment)),
      ),
    }
  })
}

export async function generateMetadata(props: PageProps<'/[[...mdxPath]]'>) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: PageProps<'/[[...mdxPath]]'>) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(
    params.mdxPath,
  )

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
