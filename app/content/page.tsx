import Header from '@/components/custom/header'
import { ModeToggle } from '@/components/theme/toggle-theme'

export default function page() {
    return (
        <>
            <Header titre="page" />
            <ModeToggle />
            <div>page</div>
        </>
    )
}
