import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getPayloadClient = () => getPayload({ config: configPromise })

export type { Payload } from 'payload'
