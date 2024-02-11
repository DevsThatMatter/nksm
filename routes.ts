/**
 * Array of Routes accessible without logging in
 * @type {string[]}
 */
export const publicRoutes = [
    "/", "/search"
]
/**
 * Array of routes used for authentication, will redirect to landing page
 * @type {string[]}
 */

export const authRoutes = [
    "/login",

]
/**
 * routes used for api authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"

/**
 * default redirect
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/"