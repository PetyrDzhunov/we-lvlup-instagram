import LayoutNavigation from './LayoutNavigation'
import '../../styles/pageLayout.css'
import LayoutFooter from './LayoutFooter'

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps): JSX.Element {
    return (
        <div>
            <LayoutNavigation />
            <div className="page-root">{children}</div>
            <LayoutFooter />
        </div>
    )
}

export default PageLayout
