// Bits
// <todo> after adding authentication we need to import the user from current auth

export async function currentUser() {
    const userId = ""// needs to be exported from somewhere

    if (!userId) {
        return null
    }

    const user = "Bits"// fetched from db

    return user
} 