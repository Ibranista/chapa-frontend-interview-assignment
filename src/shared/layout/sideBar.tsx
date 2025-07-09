import {
    HStack,
    Image,
    Stack,
    Box,
    IconButton,
    ChakraProvider,
    defaultSystem,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "@/assets/logo.svg";
import { Links } from "@/constants/links";
import HumMenu from "@/shared/components/humMenu.button";
import { Tooltip } from "@/components/ui/tooltip";
import { selectUser } from "@/features/selectors/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/thunk/auth.thunk";

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleCollapseToggle = () => setIsCollapsed((prev) => !prev)

    if (!user?.user) return null;

    const links = Links(user?.user?.role);
    const topLinks = links.slice(0, -1)
    const bottomLink = links[links.length - 1]

    return (
        <ChakraProvider value={defaultSystem}>
            <HStack wrap="wrap" position="relative">
                <Box
                    as="nav"
                    bg="white"
                    h="100vh"
                    minW={isCollapsed ? "90px" : "30px"}
                    w={isCollapsed ? "90px" : "260px"}
                    boxShadow="md"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    pt={6}
                    transition="width 0.2s"
                    position="fixed"
                    left={0}
                    top={0}
                    zIndex={999}
                >
                    <IconButton
                        aria-label="Toggle sidebar"
                        size="sm"
                        variant="ghost"
                        position="absolute"
                        top={5}
                        right={2}
                        onClick={handleCollapseToggle}
                    >
                        <HumMenu />
                    </IconButton>

                    <Tooltip content="Chapa" positioning={{ placement: "right" }}>
                        <Box>
                            <Image
                                src={logo}
                                alt="Logo"
                                h="40px"
                                w="90px"
                                objectFit="contain"
                                mx="auto"
                            />
                        </Box>
                    </Tooltip>

                    <Stack gap={4} w="100%" align="center" mt={6}>
                        {topLinks.map((link) => (
                            <Tooltip content={link.name} positioning={{ placement: "right" }} key={link.path}>
                                <Link
                                    to={link.path}
                                    style={{
                                        color: "#7FC345",
                                        fontSize: "1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: isCollapsed ? "center" : "flex-start",
                                        width: "100%",
                                        padding: isCollapsed ? "8px 0" : "8px 16px",
                                        gap: isCollapsed ? 0 : "0.5rem",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                    }}
                                >
                                    {link.icon}
                                    {!isCollapsed && <span style={{ marginLeft: 12 }}>{link.name}</span>}
                                </Link>
                            </Tooltip>
                        ))}
                    </Stack>

                    {bottomLink && bottomLink.name === "Logout" && (
                        <Box mt="auto" mb={4} w="100%" display="flex" justifyContent="center">
                            <Tooltip content={bottomLink.name} positioning={{ placement: "right" }}>
                                <button
                                    onClick={() => dispatch(logout() as any)}
                                    style={{
                                        color: "#7FC345",
                                        fontSize: "1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: isCollapsed ? "center" : "flex-start",
                                        width: "100%",
                                        padding: isCollapsed ? "8px 0" : "8px 16px",
                                        gap: isCollapsed ? 0 : "0.5rem",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {bottomLink.icon}
                                    {!isCollapsed && <span style={{ marginLeft: 12 }}>{bottomLink.name}</span>}
                                </button>
                            </Tooltip>
                        </Box>
                    )}
                </Box>

                <Box ml={isCollapsed ? "90px" : "260px"} w="100%">
                </Box>
            </HStack>
        </ChakraProvider>

    )
}
