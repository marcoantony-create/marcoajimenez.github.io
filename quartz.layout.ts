import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { h } from "preact"
import { QuartzComponent, QuartzComponentConstructor } from "./quartz/components/types"

const PersonalFooter = (() => {
  const Footer: QuartzComponent = ({ displayClass }) => {
    const year = new Date().getFullYear()
    return h("footer", { class: displayClass ?? "" }, h("p", null, `© ${year} Marco Jimenez`))
  }

  Footer.css = `
footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}
`

  return Footer
}) satisfies QuartzComponentConstructor

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: PersonalFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
    }),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
    }),
  ],
  right: [],
}
