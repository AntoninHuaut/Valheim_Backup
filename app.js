const path = require('path')
const fs = require('fs').promises
const ftp = require('basic-ftp')
const dayjs = require('dayjs')
const config = require('./config.json')

const FTP_PATH = "/.config/unity3d/IronGate/Valheim/worlds/"
const FTP_MAP_NAME = "Decouverte"

async function backupFiles() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: config.ftp.host,
            user: config.ftp.user,
            password: config.ftp.password,
            secure: false
        })

        const dateFolder = path.resolve("./files/" + dayjs().format("DD-MM-YYYY HH.mm")) + "/"
        await fs.mkdir(dateFolder, { recursive: true })

        await client.downloadTo(dateFolder + FTP_MAP_NAME + ".db", FTP_PATH + FTP_MAP_NAME + ".db")
        await client.downloadTo(dateFolder + FTP_MAP_NAME + ".fwl", FTP_PATH + FTP_MAP_NAME + ".fwl")
    } catch (err) {
        console.error(err)
    }
    client.close()
}

backupFiles()
