export function PageHeader({ title, description }: { title: string, description: string }) {
    return (
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#7DC242]">{title}</h3>
            <p className="mt-1 text-sm text-[#7DC242]">{description}</p>
        </div>
    )
}