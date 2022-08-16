
interface GithubLinkProps {
    href: string
    label: string
}

const GithubLink = (props: GithubLinkProps) => {

    const { href, label } = props

    return (
        <div className="bg-slate-200 rounded-lg hover:bg-slate-600 hover:text-slate-200 text-slate-600 duration-200 mx-4">
            <a href={href} target="_blank" className="m-4 text-2xl ">{label}</a>
        </div>
    )
}

export default GithubLink