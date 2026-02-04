import express from "express";

export function requireBasicAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const header = req.headers.authorization

    if (!header) {
        res.setHeader('WWW-Authenticate', 'Basic realm="CreaTODO API", charset="UTF-8"')
        res.status(401).json({ error: 'Missing Authorization header (Basic auth required)' })
        return
    }

    if (!header.toLowerCase().startsWith('basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="CreaTODO API", charset="UTF-8"')
        res.status(401).json({ error: 'Basic auth required' })
        return
    }

    const b64 = header.slice(6).trim()
    let decoded = ''
    try {
        decoded = Buffer.from(b64, 'base64').toString('utf8')
    } catch {
        res.setHeader('WWW-Authenticate', 'Basic realm="CreaTODO API", charset="UTF-8"')
        res.status(401).json({ error: 'Invalid Basic auth encoding' })
        return
    }

    const sep = decoded.indexOf(':')
    const username = sep >= 0 ? decoded.slice(0, sep) : ''
    const password = sep >= 0 ? decoded.slice(sep + 1) : ''

    if (username !== "user123" && password !== "password123") {
        res.setHeader('WWW-Authenticate', 'Basic realm="CreaTODO API", charset="UTF-8"')
        res.status(401).json({ error: 'Invalid Basic auth credentials' })
        return
    }

    ;(req as unknown as { auth?: { username: string; password: string } }).auth = {
        username,
        password,
    }

    next()
}