import { authOptions } from "@app/(server)/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session?.user
}

