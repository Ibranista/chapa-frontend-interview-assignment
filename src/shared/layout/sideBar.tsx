import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "@/assets/logo.svg"
import { Links } from "@/constants/links"
import HumMenu from "@/shared/components/humMenu.button"
import { selectUser } from "@/features/selectors/user.selector"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/features/thunk/auth.thunk"

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleCollapseToggle = () => setIsCollapsed((prev) => !prev)

    if (!user?.user) return null

    const links = Links(user?.user?.role)
    const topLinks = links.slice(0, -1)
    const bottomLink = links[links.length - 1]

    return (
        <div className="flex">
            <nav
                className={`bg-white h-screen shadow-md flex flex-col items-center pt-6 relative transition-all duration-200 ${isCollapsed ? "w-[90px]" : "w-[260px]"}`}
            >
                <div className="absolute top-4 left-2">
                    <button
                        aria-label="Toggle sidebar"
                        onClick={handleCollapseToggle}
                        className="p-2"
                    >
                        <HumMenu />
                    </button>
                </div>

                <div className="mt-12 mb-6">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-[90px] object-contain mx-auto"
                        title="Chapa"
                    />
                </div>

                <div className="flex flex-col items-center w-full mt-6 gap-4">
                    {topLinks.map((link) => (
                        <div key={link.path} title={link.name} className="w-full">
                            <Link
                                to={link.path}
                                className={`text-[#7FC345] text-xl font-medium flex items-center w-full ${isCollapsed ? "justify-center px-0" : "justify-start px-4 gap-2"
                                    } py-2`}
                            >
                                {link.icon}
                                {!isCollapsed && <span className="ml-3">{link.name}</span>}
                            </Link>
                        </div>
                    ))}
                </div>

                {bottomLink?.name === "Logout" && (
                    <div className="mt-auto w-full flex justify-center pb-6">
                        <button
                            onClick={() => dispatch(logout() as any)}
                            title={bottomLink.name}
                            className={`text-[#7FC345] text-xl font-medium flex items-center w-full ${isCollapsed ? "justify-center px-0" : "justify-start px-4 gap-2"
                                } py-2 bg-transparent border-none cursor-pointer`}
                        >
                            {bottomLink.icon}
                            {!isCollapsed && <span className="ml-3">{bottomLink.name}</span>}
                        </button>
                    </div>
                )}
            </nav>

        </div>
    )
}
