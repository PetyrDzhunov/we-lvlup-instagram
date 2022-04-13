import LayoutNavigation from './LayoutNavigation'
import '../../styles/pageLayout.css'

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps): JSX.Element {
    return (
        <div>
            <LayoutNavigation />
            <div className="page-root">{children}</div>
        </div>
    )
}

export default PageLayout
