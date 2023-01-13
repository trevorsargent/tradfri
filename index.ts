import { Accessory, TradfriClient } from 'node-tradfri-client'
import * as dgram from 'dgram';
import * as dotenv from 'dotenv'

dotenv.config()

const lights = new Map<number, Accessory>

const trad = new TradfriClient(process.env.ADDR as string)

const saveDevice = (device: Accessory) => {
    if (device.lightList && device.lightList.length > 0) {
        lights.set(device.instanceId, device)
        console.log(device.lightList[0].color)
    }
}

const connectTrad = async () => {
    const b = await trad.authenticate(process.env.CODE as string)
    trad.connect(b.identity, b.psk)
    await trad.observeDevices()
    await trad.observeGroupsAndScenes()
    trad.on('device updated', saveDevice)
    Object.values(trad.devices).forEach(saveDevice)
}



connectTrad().then(_ => console.log("trad connected"))

const socket = dgram.createSocket('udp4')

socket.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    socket.close();
});

socket.on('message', (msg, rinfo) => {

    try {
        const split = msg.toString().split(" ")
        console.log(split)

        const [intensity, color, time] = split

        Array.from(lights.values()).forEach(light => {
            trad.operateLight(light, { color: color, transitionTime: Number.parseInt(time), dimmer: Number.parseInt(intensity) })
        })

    } catch (e) {
        console.warn(e)
    }

});

socket.on('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(9000)